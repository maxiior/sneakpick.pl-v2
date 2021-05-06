import React from "react";
import Grid from "@material-ui/core/Grid";
import styled from "styled-components";

const State = styled.div`
  margin-left: 10px;
  margin-top: 10px;
  font-size: 14px;
  position: absolute;
  background-color: #191919;
  padding: 2px 8px;
  border-radius: 3px;
  color: white;
`;

const Informations = styled.div`
  box-sizing: border-box;
  padding: 0 20px;
  width: 100%;
  height: 60px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;

  h1 {
    margin: 0;
    font-size: 18px;
    font-weight: 400;
  }

  h2 {
    margin: 0;
    margin-top: -3px;
    font-size: 14px;
    font-weight: 600;
    color: #00b4ff;
  }
`;

const Announcement = styled.div`
  border: 1px solid #f0f0f0;
  cursor: pointer;
  text-decoration: none;
  width: 100%;
  height: 100%;
  position: relative;
`;

const View = styled.div`
  padding-bottom: 75%;
  box-sizing: border-box;
  resize: horizontal;
  max-width: 100%;
  padding: 10px 10px 0 10px;
  position: relative;
`;

const Photo = styled.div`
  border: 1px solid #f0f0f0;
  width: 100%;
  object-fit: cover;
  padding-bottom: 75%;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
`;

const SingleAnnoun = ({ name, price, state, photo }) => {
  return (
    <Grid item xs={12} sm={6} lg={4} xl={3}>
      <Announcement>
        <View>
          <State>DS</State>
          <Photo style={{ backgroundImage: `url(${photo})` }}></Photo>
        </View>
        <Informations>
          <div>
            <h1>NIKE AIR MAX 95</h1>
            <h2>500 PLN + SHIP</h2>
          </div>
        </Informations>
      </Announcement>
    </Grid>
  );
};

export default SingleAnnoun;
