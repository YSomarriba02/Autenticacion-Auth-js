interface props {
  name: string;
}

export default function OtpInput({ name }: props) {
  return (
    <input
      type="number"
      minLength={1}
      maxLength={1}
      name={name}
      className="w-6 bg-(--text)"
    />
  );
}
