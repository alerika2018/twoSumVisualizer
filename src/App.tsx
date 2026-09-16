import { useCallback, useState, type ReactNode } from "react";
import "./style.css";
import ParamsVisualization from "./ParamsVisualization";

function App() {
  const [numbersError, setNumbersError] = useState("");
  const [targetError, setTargetError] = useState("");
  const [algorithmError, setAlgorithmError] = useState("");
  const [resultMsg, setResultMsg] = useState<ReactNode>("");

  const [selectedAlgorithm, setSelectedAlgorithm] = useState<string>("0");
  const [numberGroup, setNumberGroup] = useState<string>("");
  const [target, setTarget] = useState<string>("");

  const [showParamsVisualization, setShowParamsVisualization] =
    useState<boolean>(false);

  const [twoSumPair, setTwoSumPair] = useState<number[]>([]);

  const [twoLoopsTimeConsuming, setTwoLoopsTimeConsuming] =
    useState<ReactNode>("");
  const [hashTimeConsuming, setHashTimeConsuming] = useState<ReactNode>("");

  const handleSelectedAlgorithm = useCallback((value: string) => {
    setShowParamsVisualization(false);
    setResultMsg("");
    setTwoLoopsTimeConsuming("");
    setSelectedAlgorithm(value);
  }, []);

  const handleTarget = useCallback((value: string) => {
    setTarget(value);
  }, []);

  const handleNumbersGroup = useCallback((value: string) => {
    setNumberGroup(value);
  }, []);

  const paramsValid = useCallback((): boolean => {
    //check numbers
    if (numberGroup.trim() == "") {
      setNumbersError("Must be present");
      return false;
    }
    const arr: string[] = numberGroup.split(",");
    if (arr.length <= 2) {
      setNumbersError("Length of numbers must be grater than 2");
      return false;
    }
    for (let i = 0; i < arr.length; i++) {
      const numberElement: number = parseInt(arr[i]);
      if (isNaN(numberElement)) {
        setNumbersError("The group of numbers is not valid.");
        return false;
      }
    }
    setNumbersError("");

    //check target
    const toTarget: number = parseInt(target);
    if (target.trim() === "") {
      setTargetError("Must be present");
      return false;
    }
    if (isNaN(toTarget) || toTarget < 2) {
      setTargetError("Target value is not valid.");
      return false;
    }
    setTargetError("");

    //check selection
    const selection: number = parseInt(selectedAlgorithm);
    if (selection === 0) {
      setAlgorithmError("Select an algorithm to find the sum");
      return false;
    }
    setAlgorithmError("");
    return true;
  }, [numberGroup, selectedAlgorithm, target]);

  const convertStringArrIntoNumberArr = useCallback((): number[] => {
    return numberGroup.split(",").map((n) => {
      return parseInt(n);
    });
  }, [numberGroup]);

  const twoLoops = useCallback(() => {
    const pair: number[] = [];
    const toTarget = parseInt(target);
    const arr = convertStringArrIntoNumberArr();
    outerloop: for (let i = 0; i < arr.length; i++) {
      for (let j = i + 1; j < arr.length; j++) {
        const sum = arr[i] + arr[j];
        if (sum === toTarget) {
          pair.push(arr[i]);
          pair.push(arr[j]);
          setTwoSumPair(pair);
          break outerloop;
        }
      }
    }
    if (pair.length > 1) {
      setResultMsg(
        <span>
          A pair of numbers have been found:{" "}
          <b>
            {pair[0]},{pair[1]}
          </b>
        </span>,
      );
    } else {
      setResultMsg("Unable to find a pair of numbers to equal the target");
    }
  }, [convertStringArrIntoNumberArr, target]);

  const hashTable = useCallback(() => {
    const toTarget = parseInt(target);
    const map = new Map();
    const arr = convertStringArrIntoNumberArr();
    const arrResult: number[] = [];
    arr.forEach((n: number) => {
      map.set(toTarget - n, n);
    });

    for (let i = 0; i < arr.length; i++) {
      const result = map.get(arr[i]);
      if (result) {
        arrResult.push(result);
        arrResult.push(arr[i]);
        setTwoSumPair(arrResult);
        break;
      }
    }
    if (arrResult.length > 1) {
      setResultMsg(
        <span>
          A pair of numbers have been found:{" "}
          <b>
            {arrResult[0]},{arrResult[1]}
          </b>
        </span>,
      );
    } else {
      setResultMsg("Unable to find a pair of numbers to equal the target");
    }
  }, [convertStringArrIntoNumberArr, target]);

  const generateTwoLoop = useCallback(() => {
    const startTime = performance.now();
    twoLoops();
    const endTime = performance.now();
    setTwoLoopsTimeConsuming(
      <span>
        Time consumed using nested loops <b>{endTime - startTime} ms</b>
      </span>,
    );
  }, [twoLoops]);

  const generateHash = useCallback(() => {
    const startTime = performance.now();
    hashTable();
    const endTime = performance.now();
    setHashTimeConsuming(
      <span>
        Time consumed using a hash table <b>{endTime - startTime} ms</b>
      </span>,
    );
  }, [hashTable]);

  const handleCalculate = useCallback(() => {
    const isValid: boolean = paramsValid();

    if (isValid) {
      setShowParamsVisualization(true);
      switch (selectedAlgorithm) {
        case "1":
          generateTwoLoop();
          break;
        case "3":
          generateHash();
          break;
        case "4":
          generateTwoLoop();
          generateHash();
          break;
        default:
          break;
      }
    }
  }, [hashTable, paramsValid, selectedAlgorithm, twoLoops]);

  const arrNumbers = convertStringArrIntoNumberArr();
  const toTarget = parseInt(target);

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
          <textarea
            className="numberGroup"
            value={numberGroup}
            onChange={(e) => handleNumbersGroup(e.target.value)}
            rows={4}
          />
          <p className="pError">{numbersError}</p>
        </div>
        <div>
          <p>Target</p>
          <input
            value={target}
            onChange={(e) => handleTarget(e.target.value)}
            type="number"
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
        <>
          <div className="results">
            <p>{resultMsg}</p>
            {twoLoopsTimeConsuming && <p>{twoLoopsTimeConsuming}</p>}
            {hashTimeConsuming && <p>{hashTimeConsuming}</p>}
          </div>
          <ParamsVisualization
            numbers={arrNumbers}
            target={toTarget}
            twoSumPair={twoSumPair}
          />
        </>
      )}
    </div>
  );
}

export default App;
