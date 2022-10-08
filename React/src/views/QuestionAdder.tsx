import React, { useState } from "react";
import styled from "styled-components";
import Description from "components/QuestionAdder/Description";
import Categories from "components/QuestionAdder/Categories";
import Photos from "components/QuestionAdder/Photos";
import { useHistory } from "react-router-dom";
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

const AddQuestion = () => {
  const [images, setImages] = useState([]);
  const [imagesError, setImagesError] = useState("");
  const [backendError, setBackendError] = useState(false);

  const [title, setTitle] = useState("");
  const [item, setItem] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  const history = useHistory();
  const dispatch = useAppDispatch();

  const questionAddingProcess = () => {
    if (ImageValidators.validate(images)) {
      alert("Coś poszło nie tak");
      return;
    }
    const payload = new FormData();
    const data = {
      title,
      description,
      category,
      item,
    };

    for (const [key, value] of Object.entries(data))
      payload.append(key, value.toString());

    for (let i = 0; i < images.length; i++) payload.append("images", images[i]);

    addQuestion(payload)
      .then((response) => {
        if (response.status === 201) {
          history.push(routes.TALK);
          dispatch(setInformationBlock(information_types.question_added));
        }
      })
      .catch(() => {
        setBackendError(true);
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
      });
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Pole jest wymagane."),
    category: Yup.string().nullable().required("Zaznacz jedną z opcji."),
    description: Yup.string().required("Pole jest wymagane."),
    isIdentityCheck: Yup.boolean(),
    item: Yup.string().when("isIdentityCheck", {
      is: false,
      then: Yup.string().required("Pole jest wymagane."),
    }),
  });

  const methods = useForm({
    mode: "onSubmit",
    resolver: yupResolver(validationSchema),
  });

  const { handleSubmit } = methods;

  const onError = () => {
    let error = ImageValidators.validate(images);
    if (error) setImagesError(error);
  };

  return (
    <Wrapper>
      <FormProvider {...methods}>
        <Form onSubmit={handleSubmit(questionAddingProcess, onError)}>
          {backendError && (
            <Error>
              Błąd serwera. Niestety coś poszło nie tak. Spróbuj ponownie
              później.
            </Error>
          )}
          <Header>Dodawanie pytania</Header>
          <Categories setCategory={setCategory} />
          <TextInput
            setValue={setTitle}
            name={"title"}
            placeholder={"np. Czy to Supreme Bogo hoodie jest legit?"}
          />
          <Description setDescription={setDescription} />
          {category && category !== "id" && (
            <TextInput
              setValue={setItem}
              name={"item"}
              placeholder={"np. Puma Thunder Spectra"}
            />
          )}
          <Photos
            images={images}
            setImages={setImages}
            imagesError={imagesError}
            setImagesError={setImagesError}
          />
          <Button type="submit">Dodaj pytanie</Button>
        </Form>
      </FormProvider>
    </Wrapper>
  );
};

export default AddQuestion;
