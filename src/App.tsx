import { useCallback, useState } from "react";
import "./style.css";
import ParamsVisualization from "./ParamsVisualization";

function App() {
  const [numbersError, setNumbersError] = useState("");
  const [targetError, setTargetError] = useState("");
  const [algorithmError, setAlgorithmError] = useState("");

  const [selectedAlgorithm, setSelectedAlgorithm] = useState<string>("0");
  const [numberGroup, setNumberGroup] = useState<string>("");
  const [target, setTarget] = useState<string>("");

  const [arrNumbers, setArrNumbers] = useState<number[]>([]);
  const [toTarget, setToTarget] = useState<number>(0);
  const [showParamsVisualization, setShowParamsVisualization] =
    useState<boolean>(false);

  const handleSelectedAlgorithm = useCallback((value: string) => {
    setSelectedAlgorithm(value);
  }, []);

  const handleTarget = useCallback((value: string) => {
    setTarget(value);
  }, []);

  const handleNumbersGroup = useCallback((value: string) => {
    setNumberGroup(value);
  }, []);

  const handleCalculate = useCallback(() => {
    //check numbers
    if (numberGroup.trim() == "") {
      setNumbersError("Must be present");
      return;
    }
    const arr: string[] = numberGroup.split(",");
    if (arr.length <= 2) {
      setNumbersError("Length of numbers must be grater than 2");
      return;
    }
    const arrNumbers: number[] = [];
    for (let i = 0; i < arr.length; i++) {
      const numberElement: number = parseInt(arr[i]);
      if (isNaN(numberElement)) {
        setNumbersError("The group of numbers is not valid.");
        break;
      } else {
        arrNumbers.push(numberElement);
      }
    }
    setNumbersError("");
    setArrNumbers(arrNumbers);

    //check target
    const toTarget: number = parseInt(target);
    if (target.trim() === "") {
      setTargetError("Must be present");
      return;
    }
    if (isNaN(toTarget) || toTarget < 2) {
      setTargetError("Target value is not valid.");
      return;
    }
    setToTarget(toTarget);
    setTargetError("");

    //check selection
    const selection: number = parseInt(selectedAlgorithm);
    if (selection === 0) {
      setAlgorithmError("Select an algorithm to find the sum");
      return;
    }
    setAlgorithmError("");

    setShowParamsVisualization(true);
  }, [numberGroup, selectedAlgorithm, target]);

  return (
    <div>
      <h1>Two Sum Visualizer</h1>
      <div className="instructions">
        <p>This mini app was made to solve the "Two Sum" algorithm.</p>
        <p> It will need 2 parameters:</p>
        <ul>
          <li>A group of numbers separated by coma</li>
          <li>
            A target, meaning the result of the sum of 2 numbers found in the
            group of numbers
          </li>
        </ul>
      </div>
      <div className="parameters">
        <div>
          <p>Group of numbers</p>
          <input
            className="numberGroup"
            value={numberGroup}
            onChange={(e) => handleNumbersGroup(e.target.value)}
          />
          <p className="pError">{numbersError}</p>
        </div>
        <div>
          <p>Target</p>
          <input
            value={target}
            type="number"
            onChange={(e) => handleTarget(e.target.value)}
          />
          <p className="pError">{targetError}</p>
        </div>
        <div>
          <p>Select how to solve it</p>
          <select
            id="algorithm"
            value={selectedAlgorithm}
            onChange={(e) => handleSelectedAlgorithm(e.target.value)}
            className="dropdown"
          >
            <option value="0" disabled>
              -- Select and algorithm --
            </option>
            <option value="1">Nested loops</option>
            <option value="2">Two pointers</option>
            <option value="3">Hash table</option>
            <option value="4">All of the above</option>
          </select>
          <p className="pError">{algorithmError}</p>
        </div>
        <button className="calculate" onClick={handleCalculate}>
          Calculate
        </button>
      </div>
      {showParamsVisualization && (
        <ParamsVisualization numbers={arrNumbers} target={toTarget} />
      )}
    </div>
  );
}

export default App;
