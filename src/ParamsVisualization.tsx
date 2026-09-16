import "./style.css";
interface ParamsVisualization {
  numbers: number[];
  target: number;
  twoSumPair: number[];
}
const ParamsVisualization = ({
  numbers,
  target,
  twoSumPair,
}: ParamsVisualization) => {
  return (
    <div className="paramsVisualization">
      <div className="params">
        <p>Target: {target}</p>
      </div>

      <div className="blueSquareContainer">
        <div className="blueSquare"></div>
        <p>target found inside the array</p>
      </div>

      <div className="greenSquareContainer">
        <div className="greenSquare"></div>
        <p>pair of numbers found</p>
      </div>

      <div className="arrContainer">
        {numbers.map((n, index) => {
          const colorClass =
            n === target
              ? "arrItemBlue"
              : twoSumPair.find((x) => x === n)
                ? "arrItemGreen"
                : "";
          return (
            <div className={`arrItem ${colorClass}`} key={index}>
              <p className="index">{index}</p>
              <p>{n}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ParamsVisualization;
