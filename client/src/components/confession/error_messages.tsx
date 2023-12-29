interface ErrorMessagesProps {
  messages: string[];
}

const ErrorMessages: React.FC<ErrorMessagesProps> = ({ messages }) => {
  return <div className="errorMsg">{messages.join(", ")}</div>;
};

export default ErrorMessages;
