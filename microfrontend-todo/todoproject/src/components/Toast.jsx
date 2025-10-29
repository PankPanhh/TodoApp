import React from 'react';
import { SuccessIcon, ErrorIcon } from './Icons.jsx';

/**
 * Hiển thị thông báo (toast).
 * @param {object} props
 * @param {string} props.message - Nội dung thông báo.
 * @param {'success' | 'error'} props.type - Loại thông báo.
 * @param {boolean} props.show - Hiển thị hay ẩn toast.
 */
const Toast = ({ message, type, show }) => {
  const isSuccess = type === 'success';
  const bg = isSuccess ? 'bg-green-600' : 'bg-red-600';
  const ring = isSuccess ? 'ring-green-400/30' : 'ring-red-400/30';
  const Icon = isSuccess ? SuccessIcon : ErrorIcon;

  return (
    <div
      role="status"
      aria-live="polite"
      className={`fixed top-5 right-5 z-50 max-w-sm w-[92vw] sm:w-auto p-3 sm:p-4 rounded-xl shadow-2xl text-white font-medium transition-all duration-500 ease-out ${bg} ring-1 ${ring} ${
        show ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'
      }`}
    >
      <div className="flex items-start gap-3">
        <div className="shrink-0 mt-0.5">
          <Icon />
        </div>
        <div className="min-w-0">
          <p className="text-sm sm:text-base break-words text-white">{message}</p>
        </div>
      </div>
    </div>
  );
};

export default Toast;
