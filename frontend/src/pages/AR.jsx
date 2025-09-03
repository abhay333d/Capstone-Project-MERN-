// AR.js
import {
  bootstrapCameraKit,
  createMediaStreamSource,
  Transform2D,
} from "@snap/camera-kit";

// Keep references across invocations so we can clean up properly
let session = null;
let stream = null;
let overlay = null;
let resizeHandler = null;

export async function startAR() {
  // Prevent duplicate overlays/sessions if user clicks "View in AR" twice
  if (overlay) return;

  // --- Overlay container (covers the page) ---
  overlay = document.createElement("div");
  overlay.id = "ar-overlay";
  Object.assign(overlay.style, {
    position: "fixed",
    inset: "0",
    zIndex: "9999",
    background: "#000", // behind the canvas
  });
  document.body.appendChild(overlay);

  // --- Canvas for Camera Kit ---
  const canvas = document.createElement("canvas");
  canvas.id = "my-canvas";
  Object.assign(canvas.style, {
    position: "absolute",
    inset: "0",
    width: "100%",
    height: "100%",
  });
  overlay.appendChild(canvas);
  // Size the canvas to pixels
  const sizeCanvas = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };
  sizeCanvas();
  resizeHandler = () => sizeCanvas();
  window.addEventListener("resize", resizeHandler);

  // --- Close button ---
  const closeBtn = document.createElement("button");
  closeBtn.id = "close-ar-btn";
  closeBtn.textContent = "✕";
  Object.assign(closeBtn.style, {
    position: "absolute",
    top: "16px",
    right: "16px",
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    border: "none",
    background: "rgba(0,0,0,0.7)",
    color: "#fff",
    fontSize: "20px",
    lineHeight: "40px",
    cursor: "pointer",
    zIndex: "10000",
  });
  overlay.appendChild(closeBtn);

  // --- Boot & create session ---
  const apiToken =
    "eyJhbGciOiJIUzI1NiIsImtpZCI6IkNhbnZhc1MyU0hNQUNQcm9kIiwidHlwIjoiSldUIn0.eyJhdWQiOiJjYW52YXMtY2FudmFzYXBpIiwiaXNzIjoiY2FudmFzLXMyc3Rva2VuIiwibmJmIjoxNzQ0MzYzNjY2LCJzdWIiOiIzOWU5YzhhNy04NmM5LTQxNGEtYTYyOS1jMDI2ZjAwNzVjMmV-U1RBR0lOR341MWU0MmQ1Mi0xMGNhLTRlZDUtOGM3ZS0yYmEwZDdhNzQwZmYifQ.vJV4ifQz_GzEQqukF56RXbtwm2UOtaldkVhKcyisVB4";
  const cameraKit = await bootstrapCameraKit({ apiToken });

  session = await cameraKit.createSession({ liveRenderTarget: canvas });

  session.events.addEventListener("error", ({ detail }) => {
    if (detail?.error?.name === "LensExecutionError") {
      console.warn("Lens encountered an error and was removed.", detail.error);
    }
  });

  // --- Webcam source ---
  stream = await navigator.mediaDevices.getUserMedia({ video: true });
  const source = createMediaStreamSource(stream, {
    transform: Transform2D.MirrorX,
    cameraType: "front",
  });
  await session.setSource(source);

  // --- Apply Lens & start ---
  const LENS_ID = "8e8ad6e6-4148-4711-803e-4a1fb4ef2838";
  const GROUP_ID = "630d1061-61c4-4ba4-b23e-260ef8c88f2e";

  const lens = await cameraKit.lensRepository.loadLens(LENS_ID, GROUP_ID);
  await session.applyLens(lens);
  await session.play();

  // --- Close handler ---
  closeBtn.onclick = async () => {
    try {
      // Stop rendering and free session resources
      if (session) {
        // pause is optional, but keeps order tidy
        await session.pause();
        await session.destroy(); // correct teardown method per SDK
        session = null;
      }
      // Stop the camera
      if (stream) {
        stream.getTracks().forEach((t) => t.stop());
        stream = null;
      }
    } catch (e) {
      console.error("Error closing AR:", e);
    } finally {
      // Clean DOM + listeners
      window.removeEventListener("resize", resizeHandler);
      resizeHandler = null;
      if (overlay) {
        overlay.remove();
        overlay = null;
      }
    }
  };
}
