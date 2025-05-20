import { Modal, Calender } from "@/src/components";
import { useModal } from "@/src/contexts/ModalContext";

interface CalendarModalProps {
  selectedDate: Date | undefined;
  onSelect: (date: Date | undefined) => void;
  onClose?: () => void;
  onClear?: () => void;
  minDate?: Date;
}

const CalendarModal = ({
  selectedDate,
  onSelect,
  onClose,
  onClear,
  minDate,
}: CalendarModalProps) => {
  const { isCalendarOpen, setIsCalendarOpen } = useModal();

  const handleClose = () => {
    setIsCalendarOpen(false);
    onClose?.();
  };

  return (
    <Modal
      isOpen={isCalendarOpen}
      onClose={handleClose}
      maxWidth={{ md: "335px" }}
      hasCloseButton={false}
      p={0}
    >
      <Calender
        selectedDate={selectedDate}
        onSelect={onSelect}
        onClear={onClear}
        onClose={handleClose}
        minDate={minDate}
      />
    </Modal>
  );
};

export default CalendarModal;
