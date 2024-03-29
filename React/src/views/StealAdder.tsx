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
import { addQuestion } from "api/services/talk.service";
import TextInput from "components/QuestionAdder/TextInput";
import LoadingIcon from "components/common/LoadingIcon";
import Options from "components/StealAdder/Options";
import NumberInput from "components/StealAdder/NumberInput";

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
  const [images, setImages] = useState([]);
  const [pending, setPending] = useState(false);
  const [imagesError, setImagesError] = useState("");
  const [backendError, setBackendError] = useState(false);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const stealAddingProcess = (data: any) => {
    console.log(data);
    setPending(true);
    if (ImageValidators.validate(images)) {
      alert("Coś poszło nie tak");
      return;
    }
    const payload = new FormData();
    const pack = {
      title: data["title"],
      description: data["description"],
      category: data["category"],
      markdown: data["markdown"],
      rocket: data["rocket"],
      alert: data["alert"],
    };

    for (const [key, value] of Object.entries(pack))
      payload.append(key, value.toString());

    for (let i = 0; i < images.length; i++) payload.append("images", images[i]);

    addQuestion(payload)
      .then((response) => {
        if (response.status === 201) {
          navigate(routes.TALK);
          dispatch(setInformationBlock(information_types.question_added));
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
    title: Yup.string().required("Pole jest wymagane."),
    category: Yup.string().nullable().required("Zaznacz jedną z opcji."),
    option: Yup.string().nullable(),
    description: Yup.string().required("Pole jest wymagane."),
    markdown: Yup.number(),
    rocket: Yup.boolean().default(false),
    alert: Yup.boolean().default(false),
  });

  const methods = useForm({
    mode: "onSubmit",
    resolver: yupResolver(validationSchema),
  });

  const { handleSubmit, watch } = methods;

  const onError = () => {
    let error = ImageValidators.validate(images);
    if (error) setImagesError(error);
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
            name={"title"}
            placeholder={"np. Nike, Off-White, Adidas"}
          />
          <Description />
          {watch()["category"] && watch()["category"] !== "ea" && (
            <NumberInput />
          )}
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
