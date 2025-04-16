interface ModalProps {
  isOpen: boolean;
  children: React.ReactNode;
}

const Modal = ({ isOpen, children }: ModalProps) => {
  if (!isOpen) return null;
  return (
    <>
      {/* 배경 오버레이 */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40"></div>

      {/* 모달 컨테이너 */}
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg w-full max-w-lg max-h-[80vh] h-[100vh] overflow-y-hidden">{children}</div>
      </div>
    </>
  );
};

export default Modal;
