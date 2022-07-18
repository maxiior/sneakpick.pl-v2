import React, { useEffect } from "react";
import styled from "styled-components";
import Feature from "components/WTS/Feature";
import GridList from "components/WTS/GridList";
import ColorwayGrid from "components/WTS/ColorwayGrid";
import Description from "components/WTS/Description";
import Delivery from "components/WTS/Delivery";
import http from "api/http";
import { resetCurrentStates } from "store/creator/actions";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm, FormProvider } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Photos from "components/WTS/Photos";
import { endpoints, routes } from "routes";
import useAuthenticated from "hooks/useAuthenticated";
import TextInput from "components/WTS/TextInput";
import Combobox from "components/WTS/Combobox";
import Autocomplete from "components/WTS/Autocomplete";

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
  border-radius: ${({ theme }) => theme._5px};
  cursor: pointer;
  margin-top: 50px;
  border: 0;

  :hover {
    opacity: 0.9;
  }
`;

const WTS = () => {
  let history = useHistory();
  const dispatch = useDispatch();
  const { filters, filterTypes, currentFilters } = useSelector(
    (state) => state.creatorSlice
  );

  useAuthenticated();

  useEffect(() => {
    dispatch(resetCurrentStates());
  }, []);

  const addingProcess = () => {
    // http
    //   .post(endpoints.MAIN, {
    //     name: currentFilter.name,
    //     brand: currentFilter.brands,
    //     category: currentFilter.categories,
    //     description: currentFilter.description,
    //     kind: currentFilter.types,
    //     condition: currentFilter.conditions,
    //     size: `${
    //       currentFilter.categories === "Sneakersy"
    //         ? currentFilter.shoesSizes
    //         : currentFilter.clothesSizes
    //     }`,
    //     fit: currentFilter.fits,
    //     colorway: currentFilter.colors,
    //     price: currentFilter.price,
    //     ship: currentFilter.SHIP,
    //     meet: currentFilter.MEET,
    //   })
    //   .then((response) => {
    //     if (response.status === 201) history.push({ pathname: routes.WTB });
    //   })
    //   .catch((error) => {});
  };

  const validationSchema = Yup.object().shape({
    item_name: Yup.string().required("Pole jest wymagane."),
    brand: Yup.string().required("Pole jest wymagane."),
    category: Yup.string().nullable().required("Pole jest wymagane."),
    description: Yup.string().required("Pole jest wymagane."),
    type: Yup.string().nullable().required("Zaznacz jedną z opcji."),
    condition: Yup.string().nullable().required("Zaznacz jedną z opcji."),
    colorway: Yup.string().nullable().required("Zaznacz jedną z opcji."),
    price: Yup.number()
      .typeError("Wprowadzona wartość musi być liczbą.")
      .required("Pole jest wymagane."),
    fit: Yup.string().nullable().required("Zaznacz jedną z opcji."),
    shoeSize: Yup.string().nullable().required("Zaznacz jedną z opcji."),
    clotheSize: Yup.string().nullable().required("Zaznacz jedną z opcji."),
    photo: Yup.mixed()
      .test(
        "numberOfFiles",
        "Musisz umieścić co najmniej jedno zdjęcie.",
        (value) => {
          if (value.length > 0) return true;
          return false;
        }
      )
      .test("fileSize", "Zbyt duży rozmiar pliku.", (value) => {
        if (value.length > 0) return value[0].size <= 5242880;
        return false;
      })
      .test(
        "fileType",
        "Umieszczono plik o niepoprawnym formacie.",
        (value) => {
          if (value.length === 0) return false;
          for (var i = 0; i < value.length; i++) {
            if (
              !["image/jpeg", "image/png", "image/jpg"].includes(value[i].type)
            )
              return false;
          }
          return true;
        }
      ),
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
            <TextInput
              title="Nazwa przedmiotu"
              placeholder="np. Nike Air Max 97"
              filterType="name"
              name="item_name"
            />
            <Autocomplete
              title="Marka"
              placeholder="np. Nike"
              elements={filters.brands}
              filterType={filterTypes.brands}
            />
            <Combobox
              title="Kategoria"
              elements={filters.categories}
              filterType={filterTypes.categories}
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
            {currentFilters.categories === "Sneakersy" && (
              <GridList
                title="Rozmiar"
                name="shoeSize"
                elements={filters.shoesSizes}
                filterType={filterTypes.shoesSizes}
                currentFilter={currentFilters.shoesSizes}
                small
              />
            )}
            {currentFilters.categories !== "Sneakersy" &&
              currentFilters.categories !== "placeholder" && (
                <>
                  <GridList
                    title="Rozmiar"
                    name="clotheSize"
                    elements={filters.clothesSizes}
                    filterType={filterTypes.clothesSizes}
                    currentFilter={currentFilters.clothesSizes}
                    small
                  />
                  <GridList
                    title="Fit"
                    name="fit"
                    elements={filters.fits}
                    filterType={filterTypes.fits}
                    currentFilter={currentFilters.fits}
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
              filterType="price"
              number
              name="price"
            />
            <Delivery
              defaultValue="Warszawa"
              ship={currentFilters.SHIP}
              meet={currentFilters.MEET}
            />
          </Panel>
          <Add type="submit">Dodaj ogłoszenie</Add>
        </Form>
      </FormProvider>
    </Wrapper>
  );
};

export default WTS;
