import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectIngrediente } from "../store/recipe/selectors";
import { updateIngredients } from "../store/recipe/slice";

export const Ingrediente = (props) => {
  //const ingredients = useSelector(selectIngrediente);
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [unit, setUnit] = useState("");
  const onNameChange = (e) => {
    setTitle(e.target.value);
    const updateIngredient = {
      title: e.target.value,
      amount: amount,
      unit: unit,
      index: props.index,
    };
    dispatch(updateIngredients(updateIngredient));
  };
  const onUnitChange = (e) => {
    setUnit(e.target.value);
    const updateIngredient = {
      title: title,
      amount: amount,
      unit: e.target.value,
      index: props.index,
    };
    dispatch(updateIngredients(updateIngredient));
  };
  const onAmountChange = (e) => {
    setAmount(e.target.value);
    const updateIngredient = {
      title: title,
      amount: e.target.value,
      unit: unit,
      index: props.index,
    };
    dispatch(updateIngredients(updateIngredient));
  };
  return (
    <div className="row">
      <div className="col-sm-6">
        <input
          className="form-control"
          type="text"
          value={title}
          onChange={onNameChange}
          placeholder="Name"
          aria-label="Name"
        ></input>
      </div>
      <div className="col-sm-3">
        <select
          value={unit}
          className="form-select"
          aria-label="Select the unit"
          id="units"
          name="units"
          onChange={onUnitChange}
        >
          <option value="tbsp">tbsp</option>;<option value="gr">gr</option>;
          <option value="ml">ml</option>;<option value="slice">slice</option>;
        </select>
      </div>
      <div className="col-sm-3">
        <input
          className="form-control"
          type="text"
          value={amount}
          onChange={onAmountChange}
          placeholder="Amount"
          aria-label="Amount"
        ></input>
      </div>
    </div>
  );
};
