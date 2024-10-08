import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

import AdminNavBar from "../../../components/admin_navbar/AdminNavBar";
import AdminList from "../../../components/admin_list/AdminList";
import ModalAnimalsAdmin from "../../../components/modal/modalAnimalsAdmin/ModalAnimalsAdmin";
import ModalActionsEnum from "../../../utils/ModalActionsEnum";
import CreateIcon from "../../../assets/icons/create_icon.svg";
import LoadingPaw from "../../../components/loadingPaw";

import Input from "../../../components/input/Input";
import { createAnimal, deleteAnimal, getAllAnimals, updateAnimal } from "../../../services/api/animals";
import checkPermissions from "../../../utils/checkPermissions";

import "./styles.scss";

function Animals() {
  const navigate = useNavigate();

  const initialFilter = {
    name: null,
    gender: null,
    race: null,
  };
  const [filter, setFilter] = useState(initialFilter);

  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalAction, setModalAction] = useState(null);
  const [selectedAnimal, setSelectedAnimal] = useState(null);

  const [ userHasPermission, setUserHasPermission ] = useState(false);
  const [animalsList, setAnimalsList] = useState([]);

  useEffect(() => {
    async function checkUserPermission() {
      await checkPermissions('animals', navigate)
        .then(response => {
          setUserHasPermission(response);
        })
    }
    
    checkUserPermission();
  }, []);

  const loadAnimals = async () => {
    await getAllAnimals().then((animals) => {
      setAnimalsList(animals.map((animal) => ({
        ...animal,
        stageLife: animal.age,
        castrated: animal.castrated === true ? 'Sim' : 'Não',
        sponsor: animal.sponsorships?.lenth > 0 ? 'Sim' : 'Não',
        gender: ["m", "macho"].includes(animal.gender.toLowerCase()) ? "Macho" : "Fêmea",
        sector: animal.sector.toUpperCase()
      })))

      setLoading(false);
    });
  }

  useEffect(() => {
    setLoading(true);
    loadAnimals()
  }, []);

  const getFilteredItems = () => {
    let results = [...animalsList];

    Object.keys(filter).forEach((filterName) => {
      if (filter[filterName]) {
        results = results.filter(
          (item) =>
            item[filterName]
              .toLowerCase()
              .indexOf(filter[filterName].toLowerCase()) !== -1
        );
      }
    });

    return results;
  };

  const updateAnimalsList = async (animal) => {
    const formData = new FormData();

    formData.append("id", animal.id);
    formData.append("species", animal.species);
    formData.append("name", animal.name);
    formData.append("gender", ["m", "macho"].includes(animal.gender.toLowerCase()) ? "Macho" : "Fêmea");
    formData.append("size", animal.size);
    formData.append("race", animal.race);
    formData.append("bay", animal.bay);
    formData.append("sector", animal.sector);
    formData.append("temperament", animal.temperament);
    formData.append("status", animal.status);
    formData.append("age", animal.stageLife);
    formData.append("castrated", animal.castrated === 'Sim' ? true : false);
    formData.append("color", animal.color);
    formData.append("vacine", animal.vacine);
    formData.append("observation", animal.observation);

    if (animal.image && animal.image !== animal.oldImage) {
      formData.append("image", animal.image);
    }

    await updateAnimal(formData, localStorage.getItem('login'))
      .catch((error) =>{ 
        console.log(error)
        toast.error("Erro ao atualizar. Tente novamente.");
      });

      setIsModalOpen(false);
      await loadAnimals()
  };

  const deleteAnimalsList = async (animal) => {
    await deleteAnimal(animal.id, localStorage.getItem('login'));

    setIsModalOpen(false);
    await loadAnimals();
  }

  const createAnimalsList = async (animal) => {
    const formData = new FormData();

    formData.append("species", animal.species);
    formData.append("name", animal.name);
    formData.append("gender", ['m', 'macho'].includes(String(animal.gender).toLowerCase()) ? 'Macho' : 'Fêmea');
    formData.append("size", animal.size);
    formData.append("race", animal.race);
    formData.append("bay", animal.bay);
    formData.append("sector", animal.sector);
    formData.append("temperament", animal.temperament);
    formData.append("status", animal.status);
    formData.append("age", animal.stageLife);
    formData.append("castrated", animal.castrated === 'Sim' ? true : false);
    formData.append("color", animal.color);
    formData.append("vacine", animal.vacine);
    formData.append("observation", animal.observation);

    if (!animal.image)
      return toast.info('Por favor, selecione uma imagem')
    
    formData.append("image", animal.image);

    await createAnimal(formData, localStorage.getItem('login'))
      .then(() => {
        toast.success("Criado com sucesso!");
      })
      .catch((error) =>{ 
        console.log(error)
        toast.error("Erro ao adicionar. Tente novamente.");
      });

    setIsModalOpen(false);
    await loadAnimals();
  };

  const onClickEditAnimal = (animal) => {
    setIsModalOpen(true);
    setSelectedAnimal(animal);
    setModalAction(ModalActionsEnum.UPDATE)
  };

  const onClickDeleteAnimal = (animal) => {
    setIsModalOpen(true);
    setSelectedAnimal(animal);
    setModalAction(ModalActionsEnum.DELETE)
  };

  const onClickAdoptAnimal = (animal) => {
    alert(`Abrir modal de adoção com o animal: \n\n${JSON.stringify(animal)}`)
  };

  const onClickSponsorAnimal = (animal) => {
    alert(`Abrir modal de apadrinhamento com o animal: \n\n${JSON.stringify(animal)}`)
  };

  const onClickNewAnimal = () => {
    setIsModalOpen(true);
    setSelectedAnimal(null);
    setModalAction(ModalActionsEnum.CREATE);
  };
  
  const getFilterState = (field) => {
    return filter && filter[field] ? filter[field] : "";
  };

  const columns = [
    {
      title: "ID",
      rowKey: "id",
    },
    {
      title: "Nome",
      rowKey: "name",
    },
    {
      title: "Sexo",
      rowKey: "gender",
    },
    {
      title: "Porte",
      rowKey: "size",
    },
    {
      title: "Raça",
      rowKey: "race",
    },
    {
      title: "Setor",
      rowKey: "sector",
    },
    {
      title: "Baia",
      rowKey: "bay",
    },
    {
      title: "Padrinho",
      rowKey: "sponsor",
    },
    {
      title: "Status",
      rowKey: "status",
    },
  ];

  return (
    <>
      <AdminNavBar headerTitle="Animais">
        <div className="animal-list-container">
          <div className="filters">
            <Input
              type="text"
              placeholder="Animal"
              value={getFilterState("name")}
              onChange={(e) => setFilter({ ...filter, name: e.target.value })}
            />

            <Input
              type="text"
              placeholder="Sexo"
              value={getFilterState("gender")}
              onChange={(e) => setFilter({ ...filter, gender: e.target.value })}
            />

            <Input
              type="text"
              placeholder="Raça"
              value={getFilterState("race")}
              onChange={(e) => setFilter({ ...filter, race: e.target.value })}
            />
          </div>

          {userHasPermission && (
            <div className="add-icon">
              Adicionar
              <img
                className="pointer"
                src={CreateIcon}
                onClick={onClickNewAnimal}
                alt=""
              />
            </div>
          )}
        </div>

        {loading ? (
          <LoadingPaw />
        ) : (
          <AdminList
            columns={columns}
            rows={getFilteredItems()}
            userHasPermission={userHasPermission}
            popupMenuActions={[
              { text: "Editar", onClick: onClickEditAnimal },
              { text: "Deletar", onClick: onClickDeleteAnimal },
              { text: "Adotar", onClick: onClickAdoptAnimal },
              { text: "Apadrinhar", onClick: onClickSponsorAnimal },
            ]}
          />
        )}
      </AdminNavBar>
      <ModalAnimalsAdmin
        isOpen={isModalOpen}
        modalAction={modalAction}
        onModalClose={() => setIsModalOpen(false)}
        selectedAnimal={selectedAnimal}
        animalsList={animalsList}
        updateAnimalsList={updateAnimalsList}
        createAnimalsList={createAnimalsList}
        deleteAnimalsList={deleteAnimalsList}
      />
    </>
  );
}

export default Animals;
