import React from "react";

type ChatContextType = {
  open: boolean;
  openChat: () => void;
  closeChat: () => void;
  toggleChat: () => void;
};

const ChatContext = React.createContext<ChatContextType | undefined>(undefined);

function ChatProvider(props: React.PropsWithChildren) {
  const [open, setOpen] = React.useState(false);

  const contextValue = React.useMemo(
    () => ({
      open,
      openChat: () => setOpen(true),
      closeChat: () => setOpen(false),
      toggleChat: () => setOpen((prev) => !prev),
    }),
    [open],
  );

  return <ChatContext.Provider value={contextValue} {...props} />;
}

function useChat() {
  const context = React.use(ChatContext);
  if (context === undefined) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
}

export { useChat, ChatProvider };
