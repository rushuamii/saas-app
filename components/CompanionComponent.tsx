// "use client";

// import { subjects } from "@/constants";
// import { cn, configureAssistant, getSubjectColor } from "@/lib/utils";
// import React, { useEffect, useRef, useState } from "react";
// import { vapi } from "@/lib/vapi.sdk";
// import Image from "next/image";
// import Lottie, { LottieRefCurrentProps } from "lottie-react";
// import soundwaves from "@/constants/soundwaves.json";
// import { Button } from "./ui/button";
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
//   const [isSpeaking, setisSpeaking] = useState(false);
//   const [isMuted, setisMuted] = useState(false);
//   const lottieRef = useRef<LottieRefCurrentProps>(null);
//   const [messages, setmessages] = useState<SavedMessage[]>([]);

//   useEffect(() => {
//     if (lottieRef) {
//       if (isSpeaking) {
//         lottieRef.current?.play();
//       } else {
//         lottieRef.current?.stop();
//       }
//     }
//   }, [isSpeaking, lottieRef]);

//   useEffect(() => {
//     const onCallStart = () => setCallStatus(CallStatus.ACTIVE);

//     const onCallEnd = () => {
//       setCallStatus(CallStatus.FINISHED);
//       addToSessionHistory(companionId);
//     };

//     const onMessage = (message: Message) => {
//       if (message.type === "transcript" && message.transcriptType === "final") {
//         const newMessage = { role: message.role, content: message.transcript };
//         setmessages((prev) => [newMessage, ...prev]);
//       }
//     };

//     const onSpeechStart = () => setisSpeaking(true);
//     const onSpeechEnd = () => setisSpeaking(false);

//     const onError = (error: Error) => {
//       console.log("Error", error);
//       alert("There was an issue with the call. Please try again later.");
//       setCallStatus(CallStatus.FINISHED); // Optionally reset the call status
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
//   }, []);

//   const toggleMicrophone = () => {
//     const isMuted = vapi.isMuted();
//     vapi.setMuted(!isMuted);
//     setisMuted(!isMuted);
//   };

//   const handleCall = async () => {
//     setCallStatus(CallStatus.CONNECTING);

//     const assistantOverrides = {
//       variableValues: {
//         subject,
//         topic,
//         style,
//       },
//       clientMessages: ["transcript"],
//       serverMessages: [],
//     };

//     //@ts-expect-error

//     vapi.start(configureAssistant(voice, style), assistantOverrides);
//   };

//   const handleDisconnect = () => {
//     setCallStatus(CallStatus.FINISHED);
//     vapi.stop();
//   };

//   return (
//     <section className="flex flex-col h-[70vh]">
//       <section className="flex gap-8 max-sm:flex-col">
//         <div className="companion-section">
//           <div
//             className="companion-avatar"
//             style={{ backgroundColor: getSubjectColor(subject) }}
//           >
//             <div
//               className={cn(
//                 "absolute transition-opacity duration-100",
//                 callStatus === CallStatus.FINISHED ||
//                   callStatus === CallStatus.INACTIVE
//                   ? "opacity-1001"
//                   : "opacity-0",
//                 callStatus === CallStatus.CONNECTING &&
//                   "opacity-100 animate-pulse"
//               )}
//             >
//               <Image
//                 src={`/icons/${subject}.svg`}
//                 alt={subject}
//                 width={150}
//                 height={150}
//                 className="max-sm:w-fit"
//               />
//             </div>

//             <div
//               className={cn(
//                 "absolute transition-opacity duration-1000",
//                 callStatus === CallStatus.ACTIVE ? "opacity-100" : "opacity-0"
//               )}
//             >
//               <Lottie
//                 lottieRef={lottieRef}
//                 animationData={soundwaves}
//                 autoplay={false}
//                 className="companion-lottie"
//               />
//             </div>
//           </div>
//           <p className="font-bold text-2xl">{name}</p>
//         </div>
//         <div className="user-section">
//           <div className="user-avatar">
//             <Image
//               src={userImage}
//               alt=""
//               width={130}
//               height={130}
//               className="rounded-lg"
//             />
//             <p className="font-bold text-2xl">{userName}</p>
//           </div>
//           <button
//             className="btn-mic"
//             onClick={toggleMicrophone}
//             disabled={callStatus !== CallStatus.ACTIVE}
//           >
//             <Image
//               src={isMuted ? "/icons/mic-off.svg" : "/icons/mic-on.svg"}
//               alt=""
//               width={36}
//               height={36}
//             />
//             <p className="max-sm:hidden">
//               {isMuted ? "Turn on microphone" : "Turn off microphone"}
//             </p>
//           </button>
//           <button
//             className={cn(
//               "rounded-lg py-2 cursor-pointer transition-colors w-full text-white",
//               callStatus === CallStatus.ACTIVE ? "bg-red-700" : "bg-primary",
//               callStatus === CallStatus.CONNECTING && "animate-pulse"
//             )}
//             onClick={
//               callStatus === CallStatus.ACTIVE ? handleDisconnect : handleCall
//             }
//           >
//             {callStatus === CallStatus.ACTIVE
//               ? "End Session"
//               : callStatus === CallStatus.CONNECTING
//               ? "Connecting"
//               : "Start Session"}
//           </button>
//         </div>
//       </section>
//       <section className="transcript">
//         <div className="transcript-message no-scrollbar">
//           {messages.map((message, index) => {
//             const key = `${message.role}-${message.content}-${index}`;

//             if (message.role === "assistant") {
//               return (
//                 <p key={key} className="max-sm:text-sm">
//                   {name ? name.split(" ")[0] : "Unknown Name"};{" "}
//                   {message.content}
//                 </p>
//               );
//             } else {
//               return (
//                 <p key={key} className="text-primary max-sm:text-sm">
//                   {userName}: {message.content}
//                 </p>
//               );
//             }
//           })}
//         </div>

//         <div className="transcript-fade" />
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
  const [isMuted, setIsMuted] = useState(true); // Default to muted for privacy
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
      // Initialize microphone state when call starts
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
    <section className="flex flex-col h-full min-h-[70vh]">
      {/* Top: Companion and User Info */}
      <section className="flex gap-8 max-sm:flex-col max-sm:gap-4">
        {/* Companion */}
        <div className="companion-section flex flex-col items-center">
          <div
            className="companion-avatar relative w-[150px] h-[150px] rounded-full flex items-center justify-center"
            style={{ backgroundColor: getSubjectColor(subject) }}
          >
            <div
              className={cn(
                "absolute transition-opacity duration-100",
                callStatus === CallStatus.FINISHED ||
                  callStatus === CallStatus.INACTIVE
                  ? "opacity-100"
                  : "opacity-0",
                callStatus === CallStatus.CONNECTING &&
                  "opacity-100 animate-pulse"
              )}
            >
              <Image
                src={`/icons/${subject}.svg`}
                alt={subject}
                width={100}
                height={100}
                className="max-sm:w-[80px]"
              />
            </div>
            <div
              className={cn(
                "absolute transition-opacity duration-1000 w-full h-full flex items-center justify-center",
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
          <p className="font-bold text-2xl mt-2 text-center">{name}</p>
        </div>

        {/* User */}
        <div className="user-section flex flex-col items-center max-sm:w-full">
          <div className="user-avatar flex flex-col items-center">
            <Image
              src={userImage}
              alt="User Avatar"
              width={250}
              height={200}
              className="rounded-lg max-sm:w-[170px] max-sm:h-[150px]"
            />
            <p className="font-bold text-2xl mt-2">{userName}</p>
          </div>

          {/* Voice Speed Control */}
          <div className="mt-4 w-full max-w-[300px]">
            <div className="flex justify-between items-center mb-1">
              <label htmlFor="voiceSpeed" className="text-sm font-semibold">
                Speed:
              </label>
              <span className="text-sm font-medium bg-gray-100 px-2 py-1 rounded">
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
            />
            <div className="flex justify-between text-xs mt-1 px-1 text-gray-600 font-medium">
              {[0.5, 0.7, 0.9, 1.1, 1.3, 1.5].map((speed) => (
                <span key={speed} className="text-xs">
                  {speed}x
                </span>
              ))}
            </div>
          </div>

          {/* Controls */}
          <div className="flex flex-col w-full max-w-[300px] gap-2 mt-4">
            <button
              className={cn(
                "flex items-center justify-center gap-2 p-2 rounded-lg border",
                callStatus === CallStatus.ACTIVE
                  ? "bg-gray-100 hover:bg-gray-200"
                  : "bg-gray-100 opacity-50 cursor-not-allowed",
                "transition-colors"
              )}
              onClick={toggleMicrophone}
              disabled={callStatus !== CallStatus.ACTIVE}
            >
              <Image
                src={isMuted ? "/icons/mic-off.svg" : "/icons/mic-on.svg"}
                alt={isMuted ? "Microphone off" : "Microphone on"}
                width={24}
                height={24}
              />
              <span className="text-sm max-sm:hidden">
                {isMuted ? "Turn on mic" : "Turn off mic"}
              </span>
              <span className="text-sm sm:hidden">
                {isMuted ? "On" : "Off"}
              </span>
            </button>

            <button
              className={cn(
                "py-2 px-4 rounded-lg cursor-pointer transition-colors w-full text-white font-medium",
                callStatus === CallStatus.ACTIVE
                  ? "bg-red-600 hover:bg-red-700"
                  : "bg-blue-600 hover:bg-blue-700",
                callStatus === CallStatus.CONNECTING &&
                  "animate-pulse bg-blue-500"
              )}
              onClick={
                callStatus === CallStatus.ACTIVE ? handleDisconnect : handleCall
              }
              disabled={callStatus === CallStatus.CONNECTING}
            >
              {callStatus === CallStatus.ACTIVE
                ? "End Session"
                : callStatus === CallStatus.CONNECTING
                ? "Connecting..."
                : "Start Session"}
            </button>
          </div>
        </div>
      </section>

      {/* Transcript Section */}
      <section className="mt-6 flex-grow overflow-y-auto bg-white rounded-lg p-4 border border-gray-200 shadow-sm max-h-[40vh]">
        <h3 className="font-semibold text-lg mb-2">Conversation</h3>
        <div className="space-y-3 text-gray-800 text-sm sm:text-base">
          {messages.length === 0 ? (
            <p className="text-gray-400 italic p-4 text-center">
              Your conversation transcript will appear here...
            </p>
          ) : (
            messages.map((message, index) => (
              <div
                key={`${message.role}-${index}`}
                className={cn(
                  "p-3 rounded-lg",
                  message.role === "assistant"
                    ? "bg-blue-50 border border-blue-100"
                    : "bg-gray-50 border border-gray-100"
                )}
              >
                <p
                  className={cn(
                    "font-semibold",
                    message.role === "assistant"
                      ? "text-blue-600"
                      : "text-gray-600"
                  )}
                >
                  {message.role === "assistant" ? name.split(" ")[0] : userName}
                  :
                </p>
                <p className="mt-1">{message.content}</p>
              </div>
            ))
          )}
        </div>
      </section>
    </section>
  );
};

export default CompanionComponent;
