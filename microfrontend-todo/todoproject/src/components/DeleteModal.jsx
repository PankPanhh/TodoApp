import React from 'react';

/**
 * Hiển thị modal xác nhận xoá.
 * @param {object} props
 * @param {boolean} props.show - Hiển thị hay ẩn modal.
 * @param {function(): void} props.onCancel - Hàm xử lý khi nhấn "Huỷ".
 * @param {function(): void} props.onConfirm - Hàm xử lý khi nhấn "Xác nhận".
 */
const DeleteModal = ({ show, onCancel, onConfirm }) => {
  return (
    <div
      className={`fixed inset-0 z-40 flex items-center justify-center transition-opacity duration-200 ${
        show ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
      aria-hidden={!show}
    >
      {/* Overlay */}
      <div className={`absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity ${show ? 'opacity-100' : 'opacity-0'}`} />
      {/* Dialog */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className={`relative p-6 rounded-xl shadow-2xl w-full max-w-sm transition-all duration-200 bg-white text-gray-900 dark:bg-gray-800 dark:text-white ${
          show ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
        }`}
      >
        <h3 id="modal-title" className="text-xl font-semibold mb-3">
          Xác nhận xoá
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Bạn có chắc chắn muốn xoá công việc này không?
        </p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-md bg-gray-200 text-gray-900 hover:bg-gray-300 transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-400 focus-visible:ring-offset-white dark:bg-gray-600 dark:text-white dark:hover:bg-gray-700 dark:focus-visible:ring-offset-gray-800"
          >
            Huỷ
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500 focus-visible:ring-offset-white dark:focus-visible:ring-offset-gray-800"
          >
            Xoá
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
