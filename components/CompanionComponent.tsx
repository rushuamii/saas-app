// "use client";

// import { subjects } from "@/constants";
// import { cn, configureAssistant, getSubjectColor } from "@/lib/utils";
// import React, { useEffect, useRef, useState } from "react";
// import { vapi } from "@/lib/vapi.sdk";
// import Image from "next/image";
// import Lottie, { LottieRefCurrentProps } from "lottie-react";
// import soundwaves from "@/constants/soundwaves.json";
// import { addToSessionHistory } from "@/lib/actions/companion.action";

// enum CallStatus {
//   INACTIVE = "INACTIVE",
//   CONNECTING = "CONNECTING",
//   ACTIVE = "ACTIVE",
//   FINISHED = "FINISHED",
// }

// const CompanionComponent = ({
//   companionId,
//   subject,
//   topic,
//   name,
//   userName,
//   userImage,
//   style,
//   voice,
// }: CompanionComponentProps) => {
//   const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
//   const [isSpeaking, setIsSpeaking] = useState(false);
//   const [isMuted, setIsMuted] = useState(true); // Default to muted for privacy
//   const [voiceSpeed, setVoiceSpeed] = useState(0.9);
//   const lottieRef = useRef<LottieRefCurrentProps>(null);
//   const [messages, setMessages] = useState<SavedMessage[]>([]);

//   useEffect(() => {
//     if (lottieRef.current) {
//       isSpeaking ? lottieRef.current.play() : lottieRef.current.stop();
//     }
//   }, [isSpeaking]);

//   useEffect(() => {
//     const onCallStart = () => {
//       setCallStatus(CallStatus.ACTIVE);
//       // Initialize microphone state when call starts
//       vapi.setMuted(isMuted);
//     };
//     const onCallEnd = () => {
//       setCallStatus(CallStatus.FINISHED);
//       addToSessionHistory(companionId);
//     };
//     const onMessage = (message: Message) => {
//       if (message.type === "transcript" && message.transcriptType === "final") {
//         setMessages((prev) => [
//           { role: message.role, content: message.transcript },
//           ...prev,
//         ]);
//       }
//     };
//     const onSpeechStart = () => setIsSpeaking(true);
//     const onSpeechEnd = () => setIsSpeaking(false);
//     const onError = (error: Error) => {
//       console.error("Call Error:", error);
//       alert("There was an issue with the call. Please try again later.");
//       setCallStatus(CallStatus.FINISHED);
//     };

//     vapi.on("call-start", onCallStart);
//     vapi.on("call-end", onCallEnd);
//     vapi.on("message", onMessage);
//     vapi.on("error", onError);
//     vapi.on("speech-start", onSpeechStart);
//     vapi.on("speech-end", onSpeechEnd);

//     return () => {
//       vapi.off("call-start", onCallStart);
//       vapi.off("call-end", onCallEnd);
//       vapi.off("message", onMessage);
//       vapi.off("error", onError);
//       vapi.off("speech-start", onSpeechStart);
//       vapi.off("speech-end", onSpeechEnd);
//     };
//   }, [companionId, isMuted]);

//   const toggleMicrophone = () => {
//     try {
//       const newMutedState = !isMuted;
//       vapi.setMuted(newMutedState);
//       setIsMuted(newMutedState);
//     } catch (error) {
//       console.error("Failed to toggle microphone:", error);
//       alert("Failed to toggle microphone. Please try again.");
//     }
//   };

//   const handleCall = async () => {
//     if (callStatus === CallStatus.ACTIVE) return;

//     setCallStatus(CallStatus.CONNECTING);
//     try {
//       //@ts-expect-error
//       await vapi.start(configureAssistant(voice, style, voiceSpeed), {
//         variableValues: { subject, topic, style },
//         clientMessages: ["transcript"],
//         serverMessages: [],
//       });
//     } catch (error) {
//       console.error("Call start failed:", error);
//       setCallStatus(CallStatus.INACTIVE);
//       alert("Failed to start call. Please try again.");
//     }
//   };

//   const handleDisconnect = () => {
//     try {
//       vapi.stop();
//       setCallStatus(CallStatus.FINISHED);
//     } catch (error) {
//       console.error("Failed to disconnect:", error);
//     }
//   };

//   return (
//     <section className="flex flex-col h-full min-h-[70vh]">
//       {/* Top: Companion and User Info */}
//       <section className="flex gap-8 max-sm:flex-col max-sm:gap-4">
//         {/* Companion */}
//         <div className="companion-section flex flex-col items-center">
//           <div
//             className="companion-avatar relative w-[150px] h-[150px] rounded-full flex items-center justify-center"
//             style={{ backgroundColor: getSubjectColor(subject) }}
//           >
//             <div
//               className={cn(
//                 "absolute transition-opacity duration-100",
//                 callStatus === CallStatus.FINISHED ||
//                   callStatus === CallStatus.INACTIVE
//                   ? "opacity-100"
//                   : "opacity-0",
//                 callStatus === CallStatus.CONNECTING &&
//                   "opacity-100 animate-pulse"
//               )}
//             >
//               <Image
//                 src={`/icons/${subject}.svg`}
//                 alt={subject}
//                 width={100}
//                 height={100}
//                 className="max-sm:w-[80px]"
//               />
//             </div>
//             <div
//               className={cn(
//                 "absolute transition-opacity duration-1000 w-full h-full flex items-center justify-center",
//                 callStatus === CallStatus.ACTIVE ? "opacity-100" : "opacity-0"
//               )}
//             >
//               <Lottie
//                 lottieRef={lottieRef}
//                 animationData={soundwaves}
//                 autoplay={false}
//                 loop={true}
//                 className="w-4/5 h-4/5"
//               />
//             </div>
//           </div>
//           <p className="font-bold text-2xl mt-2 text-center">{name}</p>
//         </div>

//         {/* User */}
//         <div className="user-section flex flex-col items-center max-sm:w-full">
//           <div className="user-avatar flex flex-col items-center">
//             <Image
//               src={userImage}
//               alt="User Avatar"
//               width={250}
//               height={200}
//               className="rounded-lg max-sm:w-[170px] max-sm:h-[150px]"
//             />
//             <p className="font-bold text-2xl mt-2">{userName}</p>
//           </div>

//           {/* Voice Speed Control */}
//           <div className="mt-4 w-full max-w-[300px]">
//             <div className="flex justify-between items-center mb-1">
//               <label htmlFor="voiceSpeed" className="text-sm font-semibold">
//                 Speed:
//               </label>
//               <span className="text-sm font-medium bg-gray-100 px-2 py-1 rounded">
//                 {voiceSpeed.toFixed(1)}x
//               </span>
//             </div>
//             <input
//               id="voiceSpeed"
//               type="range"
//               min={0.5}
//               max={1.5}
//               step={0.1}
//               value={voiceSpeed}
//               onChange={(e) => setVoiceSpeed(parseFloat(e.target.value))}
//               className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
//             />
//             <div className="flex justify-between text-xs mt-1 px-1 text-gray-600 font-medium">
//               {[0.5, 0.7, 0.9, 1.1, 1.3, 1.5].map((speed) => (
//                 <span key={speed} className="text-xs">
//                   {speed}x
//                 </span>
//               ))}
//             </div>
//           </div>

//           {/* Controls */}
//           <div className="flex flex-col w-full max-w-[300px] gap-2 mt-4">
//             <button
//               className={cn(
//                 "flex items-center justify-center gap-2 p-2 rounded-lg border",
//                 callStatus === CallStatus.ACTIVE
//                   ? "bg-gray-100 hover:bg-gray-200"
//                   : "bg-gray-100 opacity-50 cursor-not-allowed",
//                 "transition-colors"
//               )}
//               onClick={toggleMicrophone}
//               disabled={callStatus !== CallStatus.ACTIVE}
//             >
//               <Image
//                 src={isMuted ? "/icons/mic-off.svg" : "/icons/mic-on.svg"}
//                 alt={isMuted ? "Microphone off" : "Microphone on"}
//                 width={24}
//                 height={24}
//               />
//               <span className="text-sm max-sm:hidden">
//                 {isMuted ? "Turn on mic" : "Turn off mic"}
//               </span>
//               <span className="text-sm sm:hidden">
//                 {isMuted ? "On" : "Off"}
//               </span>
//             </button>

//             <button
//               className={cn(
//                 "py-2 px-4 rounded-lg cursor-pointer transition-colors w-full text-white font-medium",
//                 callStatus === CallStatus.ACTIVE
//                   ? "bg-red-600 hover:bg-red-700"
//                   : "bg-blue-600 hover:bg-blue-700",
//                 callStatus === CallStatus.CONNECTING &&
//                   "animate-pulse bg-blue-500"
//               )}
//               onClick={
//                 callStatus === CallStatus.ACTIVE ? handleDisconnect : handleCall
//               }
//               disabled={callStatus === CallStatus.CONNECTING}
//             >
//               {callStatus === CallStatus.ACTIVE
//                 ? "End Session"
//                 : callStatus === CallStatus.CONNECTING
//                 ? "Connecting..."
//                 : "Start Session"}
//             </button>
//           </div>
//         </div>
//       </section>

//       {/* Transcript Section */}
//       <section className="mt-6 flex-grow overflow-y-auto bg-white rounded-lg p-4 border border-gray-200 shadow-sm max-h-[40vh]">
//         <h3 className="font-semibold text-lg mb-2">Conversation</h3>
//         <div className="space-y-3 text-gray-800 text-sm sm:text-base">
//           {messages.length === 0 ? (
//             <p className="text-gray-400 italic p-4 text-center">
//               Your conversation transcript will appear here...
//             </p>
//           ) : (
//             messages.map((message, index) => (
//               <div
//                 key={`${message.role}-${index}`}
//                 className={cn(
//                   "p-3 rounded-lg",
//                   message.role === "assistant"
//                     ? "bg-blue-50 border border-blue-100"
//                     : "bg-gray-50 border border-gray-100"
//                 )}
//               >
//                 <p
//                   className={cn(
//                     "font-semibold",
//                     message.role === "assistant"
//                       ? "text-blue-600"
//                       : "text-gray-600"
//                   )}
//                 >
//                   {message.role === "assistant" ? name.split(" ")[0] : userName}
//                   :
//                 </p>
//                 <p className="mt-1">{message.content}</p>
//               </div>
//             ))
//           )}
//         </div>
//       </section>
//     </section>
//   );
// };

// export default CompanionComponent;

"use client";

import { subjects } from "@/constants";
import { cn, configureAssistant, getSubjectColor } from "@/lib/utils";
import React, { useEffect, useRef, useState } from "react";
import { vapi } from "@/lib/vapi.sdk";
import Image from "next/image";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import soundwaves from "@/constants/soundwaves.json";
import { addToSessionHistory } from "@/lib/actions/companion.action";

enum CallStatus {
  INACTIVE = "INACTIVE",
  CONNECTING = "CONNECTING",
  ACTIVE = "ACTIVE",
  FINISHED = "FINISHED",
}

const CompanionComponent = ({
  companionId,
  subject,
  topic,
  name,
  userName,
  userImage,
  style,
  voice,
}: CompanionComponentProps) => {
  const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [voiceSpeed, setVoiceSpeed] = useState(0.9);
  const lottieRef = useRef<LottieRefCurrentProps>(null);
  const [messages, setMessages] = useState<SavedMessage[]>([]);

  useEffect(() => {
    if (lottieRef.current) {
      isSpeaking ? lottieRef.current.play() : lottieRef.current.stop();
    }
  }, [isSpeaking]);

  useEffect(() => {
    const onCallStart = () => {
      setCallStatus(CallStatus.ACTIVE);
      vapi.setMuted(isMuted);
    };
    const onCallEnd = () => {
      setCallStatus(CallStatus.FINISHED);
      addToSessionHistory(companionId);
    };
    const onMessage = (message: Message) => {
      if (message.type === "transcript" && message.transcriptType === "final") {
        setMessages((prev) => [
          { role: message.role, content: message.transcript },
          ...prev,
        ]);
      }
    };
    const onSpeechStart = () => setIsSpeaking(true);
    const onSpeechEnd = () => setIsSpeaking(false);
    const onError = (error: Error) => {
      console.error("Call Error:", error);
      alert("There was an issue with the call. Please try again later.");
      setCallStatus(CallStatus.FINISHED);
    };

    vapi.on("call-start", onCallStart);
    vapi.on("call-end", onCallEnd);
    vapi.on("message", onMessage);
    vapi.on("error", onError);
    vapi.on("speech-start", onSpeechStart);
    vapi.on("speech-end", onSpeechEnd);

    return () => {
      vapi.off("call-start", onCallStart);
      vapi.off("call-end", onCallEnd);
      vapi.off("message", onMessage);
      vapi.off("error", onError);
      vapi.off("speech-start", onSpeechStart);
      vapi.off("speech-end", onSpeechEnd);
    };
  }, [companionId, isMuted]);

  const toggleMicrophone = () => {
    try {
      const newMutedState = !isMuted;
      vapi.setMuted(newMutedState);
      setIsMuted(newMutedState);
    } catch (error) {
      console.error("Failed to toggle microphone:", error);
      alert("Failed to toggle microphone. Please try again.");
    }
  };

  const handleCall = async () => {
    if (callStatus === CallStatus.ACTIVE) return;

    setCallStatus(CallStatus.CONNECTING);
    try {
      //@ts-expect-error
      await vapi.start(configureAssistant(voice, style, voiceSpeed), {
        variableValues: { subject, topic, style },
        clientMessages: ["transcript"],
        serverMessages: [],
      });
    } catch (error) {
      console.error("Call start failed:", error);
      setCallStatus(CallStatus.INACTIVE);
      alert("Failed to start call. Please try again.");
    }
  };

  const handleDisconnect = () => {
    try {
      vapi.stop();
      setCallStatus(CallStatus.FINISHED);
    } catch (error) {
      console.error("Failed to disconnect:", error);
    }
  };

  return (
    <section className="flex flex-col h-full min-h-[70vh] p-6 bg-gray-50 rounded-xl shadow-lg">
      {/* Header: Status and Info */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <span
            className={cn(
              "inline-flex items-center px-3 py-1 rounded-full text-sm font-medium",
              callStatus === CallStatus.ACTIVE
                ? "bg-green-100 text-green-800"
                : callStatus === CallStatus.CONNECTING
                ? "bg-yellow-100 text-yellow-800 animate-pulse"
                : "bg-gray-100 text-gray-800"
            )}
          >
            {callStatus === CallStatus.ACTIVE
              ? "Active"
              : callStatus === CallStatus.CONNECTING
              ? "Connecting"
              : "Inactive"}
          </span>
          <h2 className="text-xl font-semibold text-gray-900">{name}</h2>
        </div>
        <span className="text-sm text-gray-500">Subject: {subject}</span>
      </div>

      {/* Main Content: Companion and User Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Companion Card */}
        <div className="companion-card bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-xl transition-shadow duration-300">
          <div className="flex flex-col items-center">
            <div
              className="relative w-[150px] h-[150px] rounded-full overflow-hidden"
              style={{ backgroundColor: getSubjectColor(subject) }}
            >
              <div
                className={cn(
                  "absolute inset-0 flex items-center justify-center transition-opacity duration-300",
                  callStatus === CallStatus.FINISHED ||
                    callStatus === CallStatus.INACTIVE
                    ? "opacity-100"
                    : "opacity-0"
                )}
              >
                <Image
                  src={`/icons/${subject}.svg`}
                  alt={subject}
                  width={120}
                  height={120}
                  className="max-sm:w-[80px]"
                />
              </div>
              <div
                className={cn(
                  "absolute inset-0 flex items-center justify-center transition-opacity duration-300",
                  callStatus === CallStatus.ACTIVE ? "opacity-100" : "opacity-0"
                )}
              >
                <Lottie
                  lottieRef={lottieRef}
                  animationData={soundwaves}
                  autoplay={false}
                  loop={true}
                  className="w-4/5 h-4/5"
                />
              </div>
            </div>
            <p className="mt-4 text-lg font-medium text-gray-700 text-center">
              AI Tutor: {name}
            </p>
          </div>
        </div>

        {/* User Card */}
        <div className="user-card bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-xl transition-shadow duration-300">
          <div className="flex flex-col items-center">
            <div className="relative w-[150px] h-[150px] rounded-lg overflow-hidden">
              <Image
                src={userImage}
                alt="User Avatar"
                width={150}
                height={150}
                className="object-cover"
              />
            </div>
            <p className="mt-4 text-lg font-medium text-gray-700 text-center">
              User: {userName}
            </p>
            {/* Voice Speed Control */}
            <div className="mt-6 w-full max-w-[250px]">
              <div className="flex justify-between items-center mb-2">
                <label
                  htmlFor="voiceSpeed"
                  className="text-sm font-semibold text-gray-600"
                >
                  Voice Speed
                </label>
                <span className="text-sm font-medium text-gray-900 bg-gray-100 px-2 py-1 rounded">
                  {voiceSpeed.toFixed(1)}x
                </span>
              </div>
              <input
                id="voiceSpeed"
                type="range"
                min={0.5}
                max={1.5}
                step={0.1}
                value={voiceSpeed}
                onChange={(e) => setVoiceSpeed(parseFloat(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                aria-label="Adjust voice speed"
              />
              <div className="flex justify-between text-xs mt-1 text-gray-500">
                {[0.5, 0.7, 0.9, 1.1, 1.3, 1.5].map((speed) => (
                  <span key={speed} className="text-xs">
                    {speed}x
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <button
          className={cn(
            "flex items-center justify-center gap-2 px-6 py-3 rounded-lg border-2 border-gray-300 bg-gray-50 text-gray-700 hover:bg-gray-100 transition-colors disabled:opacity-50",
            callStatus === CallStatus.ACTIVE
              ? "opacity-100"
              : "opacity-50 cursor-not-allowed"
          )}
          onClick={toggleMicrophone}
          disabled={callStatus !== CallStatus.ACTIVE}
          aria-label={isMuted ? "Turn on microphone" : "Turn off microphone"}
        >
          <Image
            src={isMuted ? "/icons/mic-off.svg" : "/icons/mic-on.svg"}
            alt={isMuted ? "Microphone off" : "Microphone on"}
            width={20}
            height={20}
          />
          <span className="text-sm font-medium">
            {isMuted ? "Unmute" : "Mute"}
          </span>
        </button>
        <button
          className={cn(
            "flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-white font-medium transition-colors w-full md:w-auto",
            callStatus === CallStatus.ACTIVE
              ? "bg-red-600 hover:bg-red-700"
              : "bg-blue-600 hover:bg-blue-700",
            callStatus === CallStatus.CONNECTING && "animate-pulse bg-blue-500"
          )}
          onClick={
            callStatus === CallStatus.ACTIVE ? handleDisconnect : handleCall
          }
          disabled={callStatus === CallStatus.CONNECTING}
          aria-label={
            callStatus === CallStatus.ACTIVE ? "End session" : "Start session"
          }
        >
          {callStatus === CallStatus.ACTIVE ? (
            "End Session"
          ) : callStatus === CallStatus.CONNECTING ? (
            <>
              <svg
                className="w-5 h-5 animate-spin"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Connecting...
            </>
          ) : (
            "Start Session"
          )}
        </button>
      </div>

      {/* Transcript Section */}
      <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-md">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Conversation Transcript
        </h3>
        <div className="space-y-4 max-h-[40vh] overflow-y-auto">
          {messages.length === 0 ? (
            <p className="text-gray-400 italic text-center py-4">
              Start a session to see the transcript...
            </p>
          ) : (
            messages.map((message, index) => (
              <div
                key={`${message.role}-${index}`}
                className={cn(
                  "p-4 rounded-lg shadow-sm",
                  message.role === "assistant"
                    ? "bg-blue-50 border-l-4 border-blue-200"
                    : "bg-gray-50 border-l-4 border-gray-200"
                )}
              >
                <p className="font-medium text-gray-900">
                  {message.role === "assistant"
                    ? `${name.split(" ")[0]}:`
                    : `${userName}:`}
                </p>
                <p className="mt-2 text-gray-700">{message.content}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default CompanionComponent;
