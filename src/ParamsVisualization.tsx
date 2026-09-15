import "./style.css";
interface ParamsVisualization {
  numbers: number[];
  target: number;
}
const ParamsVisualization = ({ numbers, target }: ParamsVisualization) => {
  return (
    <div className="paramsVisualization">
      <div className="params">
        <p>Array: [{numbers.join(",")}]</p>
        <p>Target: {target}</p>
      </div>

      <div className="arrContainer">
        {numbers.map((n, index) => {
          return (
            <div className="arrItem" key={index}>
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
