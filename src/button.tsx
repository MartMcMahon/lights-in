const Button: React.FC<{
  x: number;
  y: number;
  handleButtonPress: (x: number, y: number) => void;
  isActive: boolean;
  isWon: boolean;
}> = ({ x, y, handleButtonPress, isActive, isWon }) => {
  return (
    <div
      className={"game-button game-button--" + (isActive ? "lit" : "unlit") + (isWon ? " shake" : "")}
      onClick={() => {
        handleButtonPress(x, y);
      }}
    />
  );
};

export default Button;
