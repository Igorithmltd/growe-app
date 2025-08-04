import InfoModal from "@/src/components/modals/InfoModal";
import { useModal } from "@/src/contexts/ModalContext";
import { useRouter } from "next/navigation";

export default function BreakSavingsWarningModal() {
  const { setIsInfoOpen } = useModal();

  const router = useRouter();

  const handleContinue = () => {
    router.push("/savings/saving-goals/123/break-savings");
    setIsInfoOpen(false);
  };

  return (
    <InfoModal
      title="Breaking Your Savings Will Incur a 5% Fee!"
      message="If you proceed with breaking this savings plan before the withdrawal date, you will lose 5% of your total savings. To avoid charges, we recommend completing the full savings duration."
      hasButton
      buttonText="Continue"
      onButtonClick={handleContinue}
    />
  );
}
