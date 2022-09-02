import React from "react";
import styled from "styled-components";
import SingleSteal from "./SingleSteal";
import Grid from "@material-ui/core/Grid";
import { useAppSelector } from "hooks/useAppSelector";
import StealsLoadingScreen from "./StealsLoadingScreen";
import LoadingIcon from "./LoadingIcon";

const Wrapper = styled.div`
  width: 100%;
  padding: 30px;
`;

const Paragraph = styled.div`
  font-size: 20px;
  padding: 5px 5px 0 5px;
  color: ${({ theme }) => theme.black};
`;

const Border = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.grey};
  margin: 20px 0;
`;

const Holder = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 50px;
`;

const BottomPanel = () => {
  const { steals, today_count, pending, reloading_pending } = useAppSelector(
    (state) => state.stealSlice
  );

  return (
    <Wrapper>
      {pending ? (
        <StealsLoadingScreen />
      ) : (
        <>
          {today_count ? (
            <>
              <Paragraph>Najnowsze</Paragraph>
              <Border />
              <Grid container spacing={2}>
                {steals["today"].map((e: any) => (
                  <SingleSteal data={e} />
                ))}
              </Grid>
              <Border />
            </>
          ) : (
            <></>
          )}
          <Grid container spacing={2}>
            {steals["later"].map((e: any) => (
              <SingleSteal data={e} />
            ))}
          </Grid>
        </>
      )}
      {reloading_pending && (
        <Holder>
          <LoadingIcon />
        </Holder>
      )}
    </Wrapper>
  );
};

export default BottomPanel;
