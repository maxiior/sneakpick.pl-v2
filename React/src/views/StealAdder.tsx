import React, { useState } from "react";
import styled from "styled-components";
import Description from "components/QuestionAdder/Description";
import Categories from "components/StealAdder/Categories";
import { useNavigate } from "react-router-dom";
import { routes } from "routes";
import { useAppDispatch } from "hooks/useAppDispatch";
import { setInformationBlock } from "store/interface/actions";
import { information_types } from "constants/informations";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, FormProvider } from "react-hook-form";
import { ImageValidators } from "validators/ImageValidators";
import { addSteal } from "api/services/steals.service";
import TextInput from "components/StealAdder/TextInput";
import LoadingIcon from "components/common/LoadingIcon";
import Options from "components/StealAdder/Options";
import NumberInput from "components/StealAdder/NumberInput";
import Photo from "components/StealAdder/Photo";
import useRoleCheck from "hooks/useRoleCheck";
import { STEAL_ADDER_ROLES } from "constants/roleAuthorizations";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const Form = styled.form`
  width: 60%;
  padding: 30px 0;
`;

const Header = styled.div`
  font-size: 25px;
  font-weight: 500;
  margin-bottom: 20px;
`;

const Button = styled.button`
  width: 100%;
  text-align: center;
  background-color: ${({ theme }) => theme.veryDarkGrey};
  color: ${({ theme }) => theme.white};
  padding: 15px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 50px;
  border: 0;

  :hover {
    opacity: 0.9;
  }
`;

const Error = styled.div`
  background-color: ${({ theme }) => theme.red};
  padding: 10px;
  color: white;
  font-size: 12px;
  margin-bottom: 15px;
  user-select: none;
`;

const Holder = styled.div`
  margin-top: 50px;
  display: flex;
  justify-content: center;
`;

const StealAdder = () => {
  const [image, setImage] = useState(new File([], ""));
  const [pending, setPending] = useState(false);
  const [imageError, setImageError] = useState("");
  const [backendError, setBackendError] = useState(false);
  const [unit, setUnit] = useState("PLN");

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  useRoleCheck(STEAL_ADDER_ROLES);

  const stealAddingProcess = (data: any) => {
    setPending(true);

    const payload = new FormData();
    const pack = {
      header: data["header"],
      description: data["description"],
      category: data["category"],
      rocket: data["rocket"],
      alert: data["alert"],
      link: data["link"],
    };

    for (const [key, value] of Object.entries(pack))
      payload.append(key, value.toString());
    payload.append("images", image);
    if (data["markdown"])
      payload.append("markdown", data["markdown"].toString() + unit);

    addSteal(payload)
      .then((response) => {
        if (response.status === 201) {
          navigate(routes.STEAL);
          dispatch(setInformationBlock(information_types.steal_added));
          setPending(false);
        }
      })
      .catch(() => {
        setBackendError(true);
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        setPending(false);
      });
  };

  const validationSchema = Yup.object().shape({
    header: Yup.string(),
    category: Yup.string().nullable().required("Zaznacz jedną z opcji."),
    option: Yup.string().nullable(),
    description: Yup.string(),
    markdown: Yup.mixed().test(
      "is-number",
      "Wartość musi być liczbą.",
      (val) => {
        return val === null || val === undefined || !isNaN(val);
      }
    ),
    rocket: Yup.boolean().default(false),
    alert: Yup.boolean().default(false),
    link: Yup.string()
      .required("Pole jest wymagane.")
      .url("Link musi być poprawnym adresem URL."),
  });

  const methods = useForm({
    mode: "onSubmit",
    resolver: yupResolver(validationSchema),
  });

  const { handleSubmit, watch } = methods;

  const onError = () => {
    if (image.size === 0) setImageError(ImageValidators.NO_IMAGES_ERROR);
    else {
      let error = ImageValidators.validate([image]);
      if (error) setImageError(error);
    }
  };

  return (
    <Wrapper>
      <FormProvider {...methods}>
        <Form onSubmit={handleSubmit(stealAddingProcess, onError)}>
          {backendError && (
            <Error>
              Błąd serwera. Niestety coś poszło nie tak. Spróbuj ponownie
              później.
            </Error>
          )}
          <Header>Dodawanie steala</Header>
          <Categories />
          <TextInput
            header="Nagłówek"
            name={"header"}
            placeholder={"np. Nike, Off-White, Adidas"}
            type="text"
          />
          <Description />
          <TextInput
            header="Link"
            name={"link"}
            placeholder={"np. https://www.nike.com"}
            type="url"
          />
          {watch()["category"] && watch()["category"] !== "ea" && (
            <NumberInput unit={unit} setUnit={setUnit} />
          )}
          <Photo
            image={image}
            imageError={imageError}
            setImage={setImage}
            setImageError={setImageError}
          />
          <Options />
          {pending ? (
            <Holder>
              <LoadingIcon />
            </Holder>
          ) : (
            <Button type="submit">Dodaj steala</Button>
          )}
        </Form>
      </FormProvider>
    </Wrapper>
  );
};

export default StealAdder;
