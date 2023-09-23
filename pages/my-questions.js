import { useState, useEffect } from "react";
import {
  Button,
  Input,
  FormControl,
  FormLabel,
  Box,
  ChakraProvider,
  Center,
  Select,
  Textarea,
  Text,
  Alert,
  AlertIcon,
  AlertDescription,
  AlertTitle,
} from "@chakra-ui/react";

export default function CreateTrivia() {
  const [triviaName, setTriviaName] = useState("");
  const [myTriviaId, setMyTriviaId] = useState("general");
  const [isPublic, setIsPublic] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isSave, setIsSave] = useState(false);

  const [myQuestions, setMyQuestions] = useState(false);
  const [newQuestions, setNewQuestions] = useState(false);
  const [requiredFieldsEmpty, setRequiredFieldsEmpty] = useState(false);
  const [emptyField, setEmptyField] = useState("");
  const [data, setData] = useState([]);

  const [isError, setIsError] = useState(null);

  let user_email = "jonaszeferino@gmail.com";

  const [questionComplete, setQuestionComplete] = useState({
    question: "",
    difficulty: "",
    correctAnswer: "",
    incorrectAnswers: ["", "", ""],
    category: "",
    user_email,
  });

  const insertQuestions = async () => {
    setIsSaving(true);
    setEmptyField("");
    try {
      let emptyFieldName = "";

      if (!questionComplete.question) {
        emptyFieldName = "Preencha a Questão";
      } else if (!questionComplete.difficulty) {
        emptyFieldName = "Escolha a Dificuldade";
      } else if (!questionComplete.category) {
        emptyFieldName = "Está Faltando a Categoria";
      } else if (!questionComplete.correctAnswer) {
        emptyFieldName = "Está Faltando a Resposta Correta";
      } else if (questionComplete.incorrectAnswers.some((answer) => !answer)) {
        emptyFieldName = "Verifique Alguma das Opções erradas";
      }

      if (emptyFieldName) {
        setEmptyField(emptyFieldName);
        setIsSaving(false);

        return;
      }

      const response = await fetch("/api/v1/postQuestionsTrivia", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_email,
          category: questionComplete.category,
          correctAnswer: questionComplete.correctAnswer,
          incorrectAnswers: questionComplete.incorrectAnswers,
          question: questionComplete.question,
          difficulty: questionComplete.difficulty,
          myTriviaId: myTriviaId,
          isPublic: isPublic,
        }),
      });
      setIsSaving(false);
      setIsSave(true);
    } catch (error) {
      console.error(error);
      console.log(error);
    }
  };

  const clean = () => {
    setQuestionComplete({
      question: "",
      difficulty: "",
      correctAnswer: "",
      incorrectAnswers: ["", "", ""],
      category: "",
      user_email: "",
    });
    setIsSave(false);
  };

  // my questions

  const getMyQuestions = async () => {
    setIsError(false);
    console.log("Chamou as questoes");

    try {
      setIsLoading(true);
      const response = await fetch(`/api/v1/getMyQuestionsTrivia`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_email: user_email,
        }),
      });
      if (response.ok) {
        const data = await response.json();
        if (data.message && data.message === "Nenhum resultado encontrado") {
          console.log("Nenhum resultado encontrado");
          console.log(data.message);
        } else {
          setData(data.questions);
          console.log(data);
        }
      } else {
        console.log(response.status);
        if (response.status === 404) {
          setIsError(true);
          console.log(isError);
        }
      }
      setIsLoading(false);
    } catch (error) {
      setIsError(true);
      console.error("Erro inesperado:", error);
      console.log(error);
    }
  };

  return (
    <>
      <ChakraProvider>
        <Center>
          <Button
            mt={4}
            colorScheme="teal"
            onClick={() => (setNewQuestions(true), setMyQuestions(false))}
            style={{ margin: "10px" }}
          >
            Novas Questões
          </Button>

          <Button
            mt={4}
            colorScheme="teal"
            onClick={() => (setMyQuestions(true), setNewQuestions(false))}
            style={{ margin: "10px" }}
          >
            Minhas Questões
          </Button>
        </Center>
      </ChakraProvider>
      <br />
      {newQuestions && (
        <div>
          <ChakraProvider>
            <Center>
              <Box p={2} maxW="740px">
                <FormControl>
                  <FormLabel>Questão</FormLabel>
                  <Textarea
                    placeholder={`Digite a pergunta da questão`}
                    value={questionComplete.question}
                    onChange={(e) =>
                      setQuestionComplete({
                        ...questionComplete,
                        question: e.target.value,
                      })
                    }
                  />
                </FormControl>

                <FormControl mt={1}>
                  <FormLabel>Dificuldade</FormLabel>
                  <Select
                    value={questionComplete.difficulty}
                    onChange={(e) =>
                      setQuestionComplete({
                        ...questionComplete,
                        difficulty: e.target.value,
                      })
                    }
                  >
                    <option value="">Escolha Dificuldade</option>
                    <option value="easy">Fácil</option>
                    <option value="medium">Médio</option>
                    <option value="hard">Difícil</option>
                  </Select>
                </FormControl>

                <FormControl mt={1}>
                  <FormLabel>Assuntos</FormLabel>
                  <Select
                    value={questionComplete.category}
                    onChange={(e) =>
                      setQuestionComplete({
                        ...questionComplete,
                        category: e.target.value,
                      })
                    }
                  >
                    <option value="">Escolha Uma Categoria</option>
                    <option value="arts_and_literature">
                      Arte e Literatura
                    </option>
                    <option value="film_and_tv">Filmes e TV</option>
                    <option value="food_and_drink">Comida e Bedidas</option>
                    <option value="general_knowledge">
                      Conhecimento Geral
                    </option>
                    <option value="geography">Geografia</option>
                    <option value="history">História Geral</option>
                    <option value="brazilian_history">
                      História do Brasil
                    </option>
                    <option value="music">Music</option>
                    <option value="science">Ciências</option>
                    <option value="society_and_culture">Cultura</option>
                    <option value="sport_and_leisure">Esportes</option>
                  </Select>
                </FormControl>

                <FormControl mt={1}>
                  <FormLabel>Resposta Correta</FormLabel>
                  <Input
                    placeholder="Digite a resposta correta"
                    value={questionComplete.correctAnswer}
                    onChange={(e) =>
                      setQuestionComplete({
                        ...questionComplete,
                        correctAnswer: e.target.value,
                      })
                    }
                  />
                </FormControl>

                {[1, 2, 3].map((index) => (
                  <FormControl key={index} mt={4}>
                    <FormLabel>Questão Errada {index}</FormLabel>
                    <Input
                      placeholder={`Digite a opção errada ${index}`}
                      value={questionComplete.incorrectAnswers[index - 1]}
                      onChange={(e) => {
                        const updatedIncorrectAnswers = [
                          ...questionComplete.incorrectAnswers,
                        ];
                        updatedIncorrectAnswers[index - 1] = e.target.value;
                        setQuestionComplete({
                          ...questionComplete,
                          incorrectAnswers: updatedIncorrectAnswers,
                        });
                      }}
                    />
                  </FormControl>
                ))}
              </Box>
            </Center>
          </ChakraProvider>

          <ChakraProvider>
            <Center>
              <Button
                mt={4}
                colorScheme="teal"
                isDisabled={isSave}
                onClick={insertQuestions}
              >
                Salvar Questão
              </Button>
            </Center>
            <br />
            <Center>
              {isSaving && <Text>Salvando..</Text>}
              {isSave && <Text>Salvo</Text>}

              {emptyField && (
                <Alert status="error" w="400px">
                  <AlertIcon />
                  <AlertTitle>Verificar campo vazio!</AlertTitle>
                  <AlertDescription> {emptyField}</AlertDescription>
                </Alert>
              )}
            </Center>
            <br />

            <Center>
              {isSave && (
                <Button mt={4} colorScheme="teal" onClick={clean}>
                  Nova Questão
                </Button>
              )}
            </Center>
          </ChakraProvider>
        </div>
      )}
      <br />
      {myQuestions && (
        <div>
          <ChakraProvider>
            <Center>
              <Text>Minhas Questões</Text>
              <Button
                mt={4}
                colorScheme="teal"
                onClick={() => getMyQuestions()}
                style={{ margin: "10px" }}
              >
                Ver Minhas Questões
              </Button>
            </Center>
            <ChakraProvider>
              <Center>
                <Box p={4} maxW="740px">
                  {data.length > 0 ? (
                    data.map((myQuestion) => (
                      <Box key={myQuestion._id} mb={4}>
                        <Text><strong>Questão: {myQuestion.question}</strong></Text>
                        <Text>Categoria: {myQuestion.category}</Text>
                        <Text>Dificuldade: {myQuestion.difficulty}</Text>
                        <Text>Correta: {myQuestion.correctAnswer}</Text>
                        <Text>Opções Erradas:</Text>
                        <Text>- {myQuestion.incorrectAnswers[0]}</Text>
                        <Text>- {myQuestion.incorrectAnswers[1]}</Text>
                        <Text>- {myQuestion.incorrectAnswers[2]}</Text>
                      </Box>
                    ))
                  ) : (
                    <Alert status="info">
                      <AlertIcon />
                      <AlertTitle>Nenhuma questão encontrada.</AlertTitle>
                      <AlertDescription>
                        Não há questões disponíveis no momento.
                      </AlertDescription>
                    </Alert>
                  )}
                </Box>
              </Center>
            </ChakraProvider>
          </ChakraProvider>
        </div>
      )}
    </>
  );
}
