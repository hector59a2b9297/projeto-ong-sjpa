import { useEffect, useState, useMemo } from "react";
import Modal from "../index";
import { IMaskInput } from "react-imask";
import ModalActionsEnum from '../../../utils/ModalActionsEnum'
import ModalDeleteConfirm from "../modalDeleteConfirm/ModalDeleteConfirm";

const ModalVolunteers = ({
  isOpen,
  modalAction,
  onModalClose,
  selectedVolunteer,
  updateVolunteersList,
  createVolunteersList,
  deleteVolunteersList,
}) => {
  const initialFormVolunteers = useMemo(() => {
    return {
      name: "",
      email: "",
      phone: "",
      address: "",
      responsible_name: "",
      profession: "",
      study_schedule: "",
      availability: "",
      sector: "",
      startDate: "",
      observation: "",
    };
  }, []);
  const [formVolunteers, setFormVolunteers] = useState(initialFormVolunteers);

  useEffect(() => {
    setFormVolunteers({
      ...selectedVolunteer,
      startDate: new Date(selectedVolunteer.created_at).toLocaleDateString()
    });
  }, [selectedVolunteer, isOpen]);

  const onClickSave = () => {
    if (selectedVolunteer) {
      updateVolunteersList(formVolunteers);
    } else {
      createVolunteersList(formVolunteers);
    }
  };

  const onClickModalClose = () => {
    onModalClose();
    setFormVolunteers(initialFormVolunteers);
  };

  const onClickDelete = () => {
    if (selectedVolunteer) {
      deleteVolunteersList(formVolunteers);
    } 
  }

  const getFormState = (field) => {
    return formVolunteers && formVolunteers[field] ? formVolunteers[field] : "";
  };

  return modalAction === ModalActionsEnum.DELETE ? (
    <ModalDeleteConfirm
      isOpen={isOpen}
      onModalClose={onClickModalClose}
      onDeleteConfirm={onClickDelete}
      message={`Deseja apagar o voluntário: ${selectedVolunteer.name}`}
    />
  ) : (
    <Modal
      isOpen={isOpen}
      onModalClose={onClickModalClose}
      title={
        selectedVolunteer
          ? "Edite os dados do voluntário"
          : "Adicione um novo voluntário"
      }
    >
      <form action="" className="modal-volunteers-form modal-form">
        <div className="al-modal-form">
          <input
            type="text"
            name="name"
            placeholder="Nome do Voluntário"
            value={getFormState("name")}
            onChange={(e) =>
              setFormVolunteers({ ...formVolunteers, name: e.target.value })
            }
          />
          <input
            type="text"
            name="email"
            placeholder="E-mail"
            value={getFormState("email")}
            onChange={(e) =>
              setFormVolunteers({ ...formVolunteers, email: e.target.value })
            }
          />
        </div>
        <div className="al-modal-form">
          <IMaskInput
            type="text"
            name="Celular"
            placeholder="Contato"
            value={getFormState("phone")}
            onAccept={(value, maskRef, e) =>
              setFormVolunteers({ ...formVolunteers, phone: value })
            }
            mask={"(00) 00000-0000"}
          />

          <input
            type="text"
            name="address"
            id=""
            placeholder="Endereço completo"
            value={getFormState("address")}
            onChange={(e) =>
              setFormVolunteers({ ...formVolunteers, address: e.target.value })
            }
          />
        </div>

        <div className="al-modal-form">
          <input
            type="text"
            name="responsible_name"
            id=""
            placeholder="Nome do responsável - se for menor"
            value={getFormState("responsible_name")}
            onChange={(e) =>
              setFormVolunteers({
                ...formVolunteers,
                responsible_name: e.target.value,
              })
            }
          />

          <input
            type="text"
            name="profession"
            id=""
            placeholder="Profissão"
            value={getFormState("profession")}
            onChange={(e) =>
              setFormVolunteers({
                ...formVolunteers,
                profession: e.target.value,
              })
            }
          />
        </div>

        <div className="al-modal-form">
          <input
            type="text"
            name="study_schedule"
            id=""
            placeholder="Horário que estuda -se menor"
            value={getFormState("study_schedule")}
            onChange={(e) =>
              setFormVolunteers({
                ...formVolunteers,
                study_schedule: e.target.value,
              })
            }
          />

          <input
            type="text"
            name="availability"
            id=""
            placeholder="Disponibilidade"
            value={getFormState("availability")}
            onChange={(e) =>
              setFormVolunteers({
                ...formVolunteers,
                availability: e.target.value,
              })
            }
          />
        </div>
        <div className="al-modal-form">
          <input
            type="text"
            name="sector"
            id=""
            placeholder="Setor"
            value={getFormState("sector")}
            onChange={(e) =>
              setFormVolunteers({
                ...formVolunteers,
                sector: e.target.value,
              })
            }
          />

          <input
            type="text"
            name="startDate"
            id=""
            placeholder="Data de início"
            readOnly
            value={getFormState("startDate")}
          />
        </div>
        <textarea
          rows="8"
          cols="10"
          name="observation"
          id=""
          placeholder="Adicione informações importantes sobre o voluntário"
          value={getFormState("observation")}
          onChange={(e) =>
            setFormVolunteers({
              ...formVolunteers,
              observation: e.target.value,
            })
          }
        />
      </form>
      <div className="align-btn-modal">
        <button onClick={onClickSave} className="btn-modal">
          {selectedVolunteer ? "Editar" : "Adicionar"}
        </button>
        <button onClick={onModalClose} className="btn-modal grey-btn">
          Cancelar
        </button>
      </div>
    </Modal>
  );
};

export default ModalVolunteers;
