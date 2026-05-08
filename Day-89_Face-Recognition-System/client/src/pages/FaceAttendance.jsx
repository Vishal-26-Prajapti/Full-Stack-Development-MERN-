import { useRef, useEffect, useState } from "react";
import Webcam from "react-webcam";
import * as faceapi from "face-api.js";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

export default function FaceAttendance() {
  const webcamRef = useRef(null);
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [status, setStatus] = useState("Loading AI models...");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    loadModels();
    fetchUsers();
  }, []);

  const loadModels = async () => {
    try {
      const MODEL_URL = "/models";

      await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
      await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
      await faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL);

      setModelsLoaded(true);
      setStatus("AI Ready. Look at the camera 👤");
    } catch (err) {
      console.log(err);
      setStatus("Error loading models ❌");
    }
  };

  const fetchUsers = async () => {
    try {
      const { data } = await API.get("/users");
      setUsers(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (!modelsLoaded || users.length === 0) return;

    const interval = setInterval(() => {
      matchFace();
    }, 3000);

    return () => clearInterval(interval);
  }, [modelsLoaded, users]);

  const matchFace = async () => {
    if (loading || success) return;

    const video = webcamRef.current?.video;

    if (!video || video.readyState !== 4) {
      setStatus("Camera not ready ❌");
      return;
    }

    setLoading(true);
    setStatus("Scanning face...");

    try {
      const detection = await faceapi
        .detectSingleFace(video, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceDescriptor();

      if (!detection) {
        setStatus("No face detected ❌");
        setLoading(false);
        return;
      }

      const liveDescriptor = detection.descriptor;

      let bestMatch = null;
      let minDistance = 1;

      users.forEach((user) => {
        if (!user.faceDescriptor) return;

        const stored = new Float32Array(JSON.parse(user.faceDescriptor));

        const distance = faceapi.euclideanDistance(liveDescriptor, stored);

        if (distance < minDistance) {
          minDistance = distance;
          bestMatch = user;
        }
      });

      console.log("Distance:", minDistance);

      if (minDistance < 0.6 && bestMatch) {
        const res = await API.post(
          "/attendance/mark",
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          },
        );

        if (res.data.totalHours) {
          setStatus(
            `Goodbye ${bestMatch.name} 👋 Total: ${res.data.totalHours} hrs`,
          );
        } else {
          setStatus(`Welcome ${bestMatch.name} 👋 (${res.data.message})`);
        }

        setSuccess(true);

        setTimeout(() => {
          navigate("/dashboard");
        }, 1500);
      } else {
        setStatus("Face not recognized ❌");
      }
    } catch (err) {
      console.log(err);
      setStatus("Error during recognition ❌");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-linear-to-br from-black via-gray-900 to-gray-800 text-white p-6">
      <h2 className="text-3xl font-bold mb-6 tracking-wide">
        AI Face Attendance
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
            ✅ Attendance Processed
          </p>
          <p className="text-xs text-gray-400 text-center">
            Check-in / Check-out completed
          </p>
        </div>
      )}

      <button
        disabled
        className="mt-6 px-6 py-2 rounded-lg bg-gray-600 cursor-not-allowed"
      >
        Auto Scanning...
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
