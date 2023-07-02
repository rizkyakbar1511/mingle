"use client";

import useConversation from "@/app/hooks/useConversation";
import axios from "axios";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { HiPaperAirplane, HiPhoto } from "react-icons/hi2";
import MessageInput from "./MessageInput";
import { CldUploadButton } from "next-cloudinary";

const Form = () => {
  const { conversationId } = useConversation();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      message: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setValue("message", "", { shouldValidate: true });
    axios.post("/api/messages", {
      ...data,
      conversationId,
    });
  };

  const handleUpload = (result: any) => {
    axios.post("/api/messages", {
      image: result?.info?.secure_url,
      conversationId,
    });
  };

  return (
    <div className="flex items-center w-full gap-2 p-4 bg-white border-t lg:gap-4">
      <CldUploadButton options={{ maxFiles: 1 }} onUpload={handleUpload} uploadPreset="gv6nfdu0">
        <HiPhoto className="text-sky-500" size={30} />
      </CldUploadButton>
      <form className="flex items-center w-full gap-2 lg:gap-4" onSubmit={handleSubmit(onSubmit)}>
        <MessageInput id="message" register={register} errors={errors} required placeholder="Write a message" />
        <button className="p-2 transition rounded-full cursor-pointer bg-sky-500 hover:bg-sky-600" type="submit">
          <HiPaperAirplane className="text-white" size={18} />
        </button>
      </form>
    </div>
  );
};

export default Form;
