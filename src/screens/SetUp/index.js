import React, { useContext, useState, useEffect, useCallback } from "react";
import { GlobalContext, DispatchTypes } from "context";
import { NoHeaderLayout } from "layouts";
import { CarouselComponent} from "components";
import { useHistory } from "react-router-dom";
import * as S from "./styles";

const SetUp = () => {
  const history = useHistory();

  return (
    <NoHeaderLayout>
      <S.Content>Test</S.Content>
    </NoHeaderLayout>
  );
};

export default SetUp;
