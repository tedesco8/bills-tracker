import React, { useContext, useEffect, useState } from "react";
import UserContext from "config/userContext";
import {
  ArrowIndicatorIcon,
  LoadingComponent,
  ButtonComponent,
  InputComponent,
} from "components";
import { HeaderLayout } from "layouts";
import { getTypes, getTotalByMonth, addRow } from "services";
import { nowYear, nowMonth, pastMonthYear, todayDate } from "lib/utils/date";
import { moneyToNumber, formatMoney } from "lib/utils/currency";

const Main = (props) => {
  const [mainLoading, setMainLoading] = useState(true);
  const [totalMonth, setTotalMonth] = useState(0);
  const [differencePastCurrent, setDiifferencePastCurrent] = useState(0);
  const [gratherThanPastMonth, setGratherThanPastMonth] = useState(false);
  const [billsTypes, setBillsTypes] = useState([]);

  const defaultForm = {
    amount: "",
    type: "",
    date: todayDate(),
    description: "",
  };
  const [form, setForm] = useState(defaultForm);

  const onChange = (name, value) => {
    setForm({
      ...form,
      [name]: value,
    });
  };

  const userContext = useContext(UserContext);
  const { user, doc, loading } = userContext;

  const setupDoc = async (user, doc) => {
    const types = await getTypes(doc);
    const pastMonthYearValue = pastMonthYear();

    const totalMonthValue = await getTotalByMonth(doc, nowMonth(), nowYear());
    const totalPastMonthValue = await getTotalByMonth(
      doc,
      pastMonthYearValue.month,
      pastMonthYearValue.year
    );

    const typesFormatted = types.map((type) => ({ value: type, label: type }));

    setBillsTypes(typesFormatted);
    setTotalMonth(totalMonthValue);
    setDiifferencePastCurrent(
      formatMoney(
        moneyToNumber(totalPastMonthValue) - moneyToNumber(totalMonthValue)
      )
    );

    setGratherThanPastMonth(
      moneyToNumber(totalMonthValue) > moneyToNumber(totalPastMonthValue)
    );

    setMainLoading(false);
  };

  useEffect(() => {
    if (!loading) {
      if (user && doc) {
        setupDoc(user, doc);
      }
    }
  }, [user, doc, loading]);

  const headerBoxProps = {
    primaryValue: `$${totalMonth}`,
    secondaryValue: `$${differencePastCurrent} this month`,
    icon: <ArrowIndicatorIcon up={gratherThanPastMonth} />,
  };

  const addTestRow = () => {
    // addRow(doc, "123", "test", "123456", "asd", "dsa");
  };

  return (
    <>
      <HeaderLayout headerBox={headerBoxProps}>
        <InputComponent
          type="money"
          placeholder="0"
          name="amount"
          onChange={onChange}
        />
        <InputComponent
          type="dropdown"
          name="type"
          title="Type"
          options={billsTypes}
          onChange={onChange}
        />
        <InputComponent
          type="date"
          name="date"
          title="Date"
          value={form.date}
          onChange={onChange}
        />
        <InputComponent
          type="bigtext"
          name="description"
          title="Description"
          placeholder="Write a description..."
          onChange={onChange}
        />
        <div>
          <ButtonComponent action={addTestRow} text="Add bill" />
        </div>
      </HeaderLayout>

      {mainLoading && <LoadingComponent />}
    </>
  );
};

export default Main;
