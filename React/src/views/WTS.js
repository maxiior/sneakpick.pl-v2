import React, { useEffect } from "react";
import styled from "styled-components";
import Feature from "components/WTS/Feature";
import GridList from "components/WTS/GridList";
import ColorwayGrid from "components/WTS/ColorwayGrid";
import Description from "components/WTS/Description";
import Delivery from "components/WTS/Delivery";
import { connect } from "react-redux";
import axiosInstance from "axios/axios";
import { resetCurrentStates as resetCurrentStatesAction } from "actions/WTS";
import { useHistory } from "react-router-dom";
import { useForm, FormProvider } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Photos from "components/WTS/Photos";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  user-select: none;
`;

const Form = styled.form`
  width: 60%;
  padding: 30px 0;
`;

const Header = styled.div`
  font-size: 35px;
  border-bottom: 1px solid ${({ theme }) => theme.black};
  font-weight: 500;
`;

const Panel = styled.div`
  margin-left: 25px;
`;

const Add = styled.button`
  width: 100%;
  text-align: center;
  background-color: ${({ theme }) => theme.veryDarkGrey};
  color: ${({ theme }) => theme.white};
  padding: 15px;
  border-radius: 10px;
  cursor: pointer;
  margin-top: 50px;
  border: 0;

  :hover {
    opacity: 0.9;
  }
`;

const WTS = ({ filters, filterTypes, currentFilter, resetCurrentStates }) => {
  let history = useHistory();

  useEffect(() => {
    resetCurrentStates();
  }, []);

  const addingProcess = () => {
    axiosInstance
      .post("", {
        name: currentFilter.name,
        brand: currentFilter.brands,
        category: currentFilter.categories,
        description: currentFilter.description,
        kind: currentFilter.types,
        condition: currentFilter.conditions,
        size: `${
          currentFilter.categories === "Sneakersy"
            ? currentFilter.shoesSizes
            : currentFilter.clothesSizes
        }`,
        fit: currentFilter.fits,
        colorway: currentFilter.colors,
        price: currentFilter.price,
        ship: currentFilter.SHIP,
        meet: currentFilter.MEET,
      })
      .then((response) => {
        if (response.status === 201) history.push({ pathname: "/wtb/" });
      })
      .catch((error) => {});
  };

  const validationSchema = Yup.object().shape({
    item_name: Yup.string().required("Pole jest wymagane."),
    brand: Yup.string().required("Pole jest wymagane."),
    category: Yup.string().required("Pole jest wymagane."),
    description: Yup.string().required("Pole jest wymagane."),
    type: Yup.string().required("Zaznacz jedną z opcji."),
    condition: Yup.string().required("Zaznacz jedną z opcji."),
    colorway: Yup.string().required("Zaznacz jedną z opcji."),
    price: Yup.number()
      .typeError("Wprowadzona wartość musi być liczbą.")
      .required("Pole jest wymagane."),
    fit: Yup.string().required("Zaznacz jedną z opcji."),
    shoeSize: Yup.string().required("Zaznacz jedną z opcji."),
    clotheSize: Yup.string().required("Zaznacz jedną z opcji."),
  });

  const methods = useForm({
    mode: "onSubmit",
    resolver: yupResolver(validationSchema),
  });

  const { handleSubmit } = methods;

  return (
    <Wrapper>
      <FormProvider {...methods}>
        <Form onSubmit={handleSubmit(addingProcess)}>
          <Header>WANT TO SELL</Header>
          <Panel>
            <Feature
              title="Nazwa przedmiotu"
              placeholder="np. Nike Air Max 97"
              filterType={filterTypes.name}
              name="item_name"
            />
            <Feature
              title="Marka"
              placeholder="np. Nike"
              elements={filters.brands}
              filterType={filterTypes.brands}
              autocomplete
            />
            <Feature
              title="Kategoria"
              placeholder="np. Teesy"
              elements={filters.categories}
              filterType={filterTypes.categories}
              combobox
            />
            <Photos />
            <Description
              name="Opis"
              placeholder="Opis"
              filterType="description"
            />
            <GridList
              title="Rodzaj"
              name="type"
              elements={filters.types}
              filterType={filterTypes.types}
              medium
            />
            <GridList
              title="Stan"
              name="condition"
              elements={filters.conditions}
              filterType={filterTypes.conditions}
              small
            />
            {currentFilter.categories === "Sneakersy" && (
              <GridList
                title="Rozmiar"
                name="shoeSize"
                elements={filters.shoesSizes}
                filterType={filterTypes.shoesSizes}
                currentFilter={currentFilter.shoesSizes}
                small
              />
            )}
            {currentFilter.categories !== "Sneakersy" &&
              currentFilter.categories !== "placeholder" && (
                <>
                  <GridList
                    title="Rozmiar"
                    name="clotheSize"
                    elements={filters.clothesSizes}
                    filterType={filterTypes.clothesSizes}
                    currentFilter={currentFilter.clothesSizes}
                    small
                  />
                  <GridList
                    title="Fit"
                    name="fit"
                    elements={filters.fits}
                    filterType={filterTypes.fits}
                    currentFilter={currentFilter.fits}
                    medium
                  />
                </>
              )}
            <ColorwayGrid
              colors={filters.colors}
              filterType={filterTypes.colors}
            />
            <Feature
              title="Cena"
              placeholder="0,00 PLN"
              filterType={filterTypes.price}
              number
              name="price"
            />
            <Delivery
              defaultValue="Warszawa"
              ship={currentFilter.SHIP}
              meet={currentFilter.MEET}
            />
          </Panel>
          <Add type="submit">Dodaj ogłoszenie</Add>
        </Form>
      </FormProvider>
    </Wrapper>
  );
};

const mapStateToProps = ({ addingItemReducer }) => {
  return {
    filters: addingItemReducer.filters,
    filterTypes: addingItemReducer.filterTypes,
    currentFilter: addingItemReducer.currentFilters,
  };
};

const mapDispatchToProps = (dispatch) => ({
  resetCurrentStates: (filterType, id, input) =>
    dispatch(resetCurrentStatesAction(filterType, id, input)),
});

export default connect(mapStateToProps, mapDispatchToProps)(WTS);
