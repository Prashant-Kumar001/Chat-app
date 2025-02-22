import {
  AlertTriangle,
  Check,
  CheckCircle,
  Info,
  X,
  XCircle,
} from "lucide-react";
import toast from "react-hot-toast";
import AvatarCard from "../shared/AvatarCard";

const notificationTypes = {
  success: {
    icon: CheckCircle,
    bgColor: "bg-green-100",
    textColor: "text-green-800",
  },
  error: { icon: XCircle, bgColor: "bg-red-100", textColor: "text-red-800" },
  warning: {
    icon: AlertTriangle,
    bgColor: "bg-yellow-100",
    textColor: "text-yellow-800",
  },
  info: { icon: Info, bgColor: "bg-blue-100", textColor: "text-blue-800" },
};

const handlerRequest = ({ _id, name, status }) => {
  status === true
    ? toast.success(`accepted ${name}`)
    : toast.error(`rejected ${name}`);
};


export default function Notifications({ notifications, onClose }) {
  return (
    <div className="absolute z-50 top-[45px] w-full max-w-[380px] right-0 px-4 py-6 space-y-4">
      <div className="flex flex-col gap-2 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 rounded-lg p-2">
        <div className="flex justify-between">
          <h2 className="r_font ">notifications</h2>
          <X
            className="cursor-pointer hover:text-gray-200"
            onClick={onClose}
            size={22}
          />
        </div>
        {!notifications?.length ? (
          <div className="flex justify-center items-center text-white">
            No notifications
          </div>
        ) : (
          notifications.map((i, index) => (
            <Notification
              key={index}
              _id={i._id}
              sender={i.sender}
              message={i.message}
              handlerRequest={handlerRequest}
            />
          ))
        )}
      </div>
    </div>
  );
}

const Notification = ({
  _id,
  sender,
  message,
  handlerAcceptReq,
  handlerRejectReq,
}) => {
  return (
    <div
      className={`flex flex-col rounded-sm px-1 ${notificationTypes[message?.status]?.bgColor
        } ${notificationTypes[message?.status]?.textColor}`}
    >
      <div className="flex gap-1 items-center mt-1 justify-between">
        <div className="flex gap-2 items-center">
          <AvatarCard avatar={sender?.avatar} name={sender?.name} size="sm" />
          <span>{sender?.name} sent you a friend r...</span>
        </div>
        <div className="flex gap-1">
          <Check onClick={() => handlerRequest({ _id, name: sender?.name, status: true })} size={24} color="green" className="cursor-pointer" />
          <X onClick={() => handlerRequest({ _id, name: sender?.name, status: false })} size={24} color="red" className="cursor-pointer" />
        </div>
      </div>
      {/* <span>{message?.text}</span> */}
    </div>
  );
};
