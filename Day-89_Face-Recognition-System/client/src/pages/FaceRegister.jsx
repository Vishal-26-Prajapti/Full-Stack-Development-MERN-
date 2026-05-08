import { useRef, useEffect, useState } from "react";
import Webcam from "react-webcam";
import * as faceapi from "face-api.js";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

export default function FaceRegister() {
  const webcamRef = useRef(null);

  const navigate = useNavigate();

  const [status, setStatus] = useState("Loading AI models...");
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    loadModels();
  }, []);

  const loadModels = async () => {
    try {
      const MODEL_URL = "/models";

      await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
      await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
      await faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL);

      setModelsLoaded(true);
      setStatus("AI Ready. Position your face 👤");
    } catch (err) {
      console.log(err);
      setStatus("Error loading models");
    }
  };

  const captureFace = async () => {
    try {
      if (!modelsLoaded) {
        setStatus("Models not loaded yet");
        return;
      }

      const video = webcamRef.current?.video;

      if (!video || video.readyState !== 4) {
        setStatus("Camera not ready");
        return;
      }

      setLoading(true);
      setStatus("Scanning face...");

      await new Promise((r) => setTimeout(r, 800));

      const detection = await faceapi
        .detectSingleFace(
          video,
          new faceapi.TinyFaceDetectorOptions({
            inputSize: 512,
            scoreThreshold: 0.5,
          }),
        )
        .withFaceLandmarks()
        .withFaceDescriptor();

      if (!detection) {
        setStatus("No face detected ❌");
        setLoading(false);
        return;
      }

      setStatus("Processing...");

      const descriptor = Array.from(detection.descriptor);

      const res = await API.post(
        "/users/save-face",
        { descriptor },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      if (res.status === 200) {
        setSuccess(true);
        setStatus("Face registered successfully ✅");

        setTimeout(() => {
          navigate("/dashboard");
        }, 1500);
      } else {
        setStatus("Failed to save face ❌");
      }
    } catch (err) {
      console.log(err);
      setStatus("Error capturing face ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-linear-to-br from-black via-gray-900 to-gray-800 text-white p-6">
      <h2 className="text-3xl font-bold mb-6 tracking-wide">
        AI Face Registration
      </h2>

      <div className="relative w-85 h-65 rounded-2xl overflow-hidden border-2 border-blue-500 shadow-xl shadow-blue-500/30">
        <Webcam
          ref={webcamRef}
          audio={false}
          screenshotFormat="image/jpeg"
          videoConstraints={{
            facingMode: "user",
            width: 1280,
            height: 720,
          }}
          className="w-full h-full object-cover"
        />

        <div className="absolute w-full h-1 bg-blue-500 opacity-70 animate-scan"></div>

        <div className="absolute inset-4 border-2 border-blue-400 rounded-xl pointer-events-none"></div>
      </div>

      <p className="mt-5 text-sm text-gray-300 animate-pulse">{status}</p>

      {success && (
        <div className="mt-4 px-6 py-3 bg-green-500/10 border border-green-500 rounded-xl">
          <p className="text-green-400 font-bold text-center">
            ✅ Face Saved Successfully
          </p>
          <p className="text-xs text-gray-400 text-center">
            You can now use face attendance
          </p>
        </div>
      )}

      <button
        onClick={captureFace}
        disabled={!modelsLoaded || loading}
        className={`mt-6 px-6 py-2 rounded-lg transition duration-300 shadow-lg
        ${
          loading
            ? "bg-gray-600 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700 hover:shadow-blue-500/50"
        }`}
      >
        {loading ? "Processing..." : "Capture Face"}
      </button>

      {loading && (
        <div className="flex gap-2 mt-3">
          <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-100"></div>
          <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-200"></div>
        </div>
      )}

      <style>
        {`
          @keyframes scan {
            0% { top: 0; }
            50% { top: 100%; }
            100% { top: 0; }
          }

          .animate-scan {
            position: absolute;
            animation: scan 3s linear infinite;
          }
        `}
      </style>
    </div>
  );
}
