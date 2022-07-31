import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Card from "../../components/Card/Card";
import GridContainer from "../../components/GridContainer";
import Modal from "../../components/Modal";
import AddQuestion from "../../features/technical/components/AddQuestion";
import { getAllTechnicalQuestions } from "../../features/technical/services/getAllTechnicalQuestions";
import SidebarLayout from "../../layouts/SidebarLayout";
import { getFormattedDate } from "../../utils/getFormattedDate";

const TechnicalQuestionsList = () => {
  const [showModal, setShowModal] = useState(false);
  const [questions, setQuestions] = useState([]);

  async function fetchQuestions() {
    try {
      const res = await getAllTechnicalQuestions();
      const questionsCards = res.data.technicalQuestions.map((project) => ({
        ...project,
        pills: project.tech_stack.split(",").map((pill, index) => ({
          text: pill,
          color:
            index % 3 === 0 ? "blue" : index % 2 === 0 ? "yellow" : "green",
        })),
        date: getFormattedDate(project.updated_at),
      }));

      setQuestions(questionsCards);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchQuestions();
  }, []);

  return (
    <SidebarLayout title="Technical Questions">
      <button onClick={() => setShowModal(true)} className="save-btn mb-xl">
        Create new
      </button>
      <GridContainer>
        {questions.map((data) => (
          <Link
            to={`/technicalquestion/${data.id}`}
            key={Math.random()}
            className="card-link"
          >
            <Card
              date={data.date}
              title={data.question}
              pills={data.pills}
            ></Card>
          </Link>
        ))}
      </GridContainer>

      {
        showModal && <Modal title="Add Question" closeModal={() => setShowModal(false)}>
          <AddQuestion></AddQuestion>
        </Modal>
      }
      
    </SidebarLayout>
  );
};

export default TechnicalQuestionsList;