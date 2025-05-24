import { Dialog } from "@radix-ui/themes";
import type { PropsWithChildren } from "react";

type ModalProps = {
   trigger: React.ReactNode;
   content: React.ReactNode;
   viewTransitionName?: string;
};

function Modal({ trigger, content, viewTransitionName }: ModalProps) {
   return (
      <Dialog.Root>
         <Dialog.Trigger>{trigger}</Dialog.Trigger>
         <Dialog.Content maxWidth="450px" style={{ viewTransitionName }}>
            {content}
         </Dialog.Content>
      </Dialog.Root>
   );
}

Modal.Close = Dialog.Close;

Modal.Title = function ({ children }: PropsWithChildren) {
   return <Dialog.Title className="!my-0 text-center">{children}</Dialog.Title>;
};

export { Modal };
