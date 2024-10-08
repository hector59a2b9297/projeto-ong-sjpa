import { useState } from "react";

import NavBar from "../../../components/navbar/NavBar";
import ContentHero from "../../../components/contentHero/ContentHero";
import Menu from "../../../components/menu/Menu";
import Footer from "../../../components/footer/Footer";
import FormOver18 from "./FormOver18";
import FormUnder18 from "./FormUnder18";

import "./volunteers.scss";

//Icons
import dog from "../../../assets/icons/landing_page/dog.svg";
import walkDog from "../../../assets/icons/landing_page/walk-dog.svg";
import heart from "../../../assets/icons/landing_page/heart.svg";
import cat from "../../../assets/icons/landing_page/cat.svg";
import socialMedia from "../../../assets/icons/landing_page/social-media.svg";
import bath from "../../../assets/icons/landing_page/bath.svg";
import clothing from "../../../assets/icons/volunteers_lp/clothing.svg";
import gloves from "../../../assets/icons/volunteers_lp/gloves.svg";
import food from "../../../assets/icons/volunteers_lp/food.svg";
import dogHouse from "../../../assets/icons/volunteers_lp/dog-house.svg";
import attention from "../../../assets/icons/volunteers_lp/attention.svg";
import volunteers from "../../../assets/icons/volunteers_lp/volunteers.svg";
import clock from "../../../assets/icons/volunteers_lp/clock.svg";
import whatsApp from "../../../assets/icons/volunteers_lp/whatsapp.svg";
import ContentTitle from "../../../components/contentTitles/ContentTitles";

// import { Container } from './styles';

function Volunteers() {
  const [selectedOption, setSelectedOption] = useState(null);

  return (
    <div className="page_container">
      <NavBar />

      {/* SEÇÃO DO TÍTULO E TEXTO SOBRE SER VOLUNTÁRIO */}
      <ContentHero
        title="Seja um voluntário"
        subtitle="Faça a diferença na vida de um animal"
        text="Voluntariar-se é uma maneira incrível de se conectar com seres que oferecem um amor puro e incondicional. Além disso, você estará rodeado por uma comunidade de pessoas que compartilham o mesmo amor e respeito pelos animais."
        text2="Não é necessário ter experiência anterior, apenas um coração aberto e a vontade de fazer a diferença são o suficiente. Os animais precisam de você e cada gesto de amor conta!"
      />

      {/* CONTEÚDO PRINCIPAL DA PÁGINA - TAREFAS DO VOLUNTÁRIO */}
      <main className="main-volunteers">
        <ContentTitle title="Seja um voluntário" subtitle="Faça a diferença na vida de um animal"></ContentTitle>

        {/* O QUE O VOLUNTÁRIO FAZ */}
        <section className="volunteer-info">
          <h4 className="volunteer-title">O que o voluntário faz</h4>
          <ul className="align-volunteers-info">
            <div className="icon-text">
              <li>
                <img src={dog} alt={"Dog"} />
                Limpeza de Canil
              </li>
              <li>
                <img src={walkDog} alt={"Walk Dog"} />
                Passeio com os cães
              </li>
              <li>
                <img src={heart} alt={"Heart"} />
                Dar carinho
              </li>
            </div>
            <div className="icon-text">
              <li>
                <img src={cat} alt={"Cat"} />
                Limpeza de Gatil
              </li>
              <li>
                <img src={socialMedia} alt={"Social Media"} />
                Divulgação nas Redes Sociais
              </li>
              <li>
                <img src={bath} alt={"Bath"} />
                Dar um banho
              </li>
            </div>
          </ul>

          {/* INSTRUÇÕES PARA O VOLUNTÁRIO  */}
          <h4 className="volunteer-title">Instruções</h4>
          <ul className="align-volunteers-info">
            <div className="icon-text">
              <li>
                <img src={clothing} alt={"Clothing"} />
                Vá com roupas e calçados que possa
                <br />
                molhar/sujar
              </li>
              <li>
                <img src={gloves} alt={"Gloves"} />
                Luvas látex para limpeza
              </li>
              <li>
                <img src={food} alt={"Food"} />
                Levar lanche e garrafinha de água
              </li>
            </div>
            <div className="icon-text">
              <li>
                <img src={dogHouse} alt={"Dog House"} />
                Respeite o humor do animal! Se ele
                <br />
                não quiser em brincar ou receber
                <br />
                carinho, naõ force a interação.
                <br />
                Priorize o bem estar do animal!
              
              </li>
              <li>
                <img src={attention} alt={"Attention"} />
                Os trincos dos canis devem 
                <br />
                estar sempre fechados
                <br />
                para garantir a segurança dos
                <br />
                animais e dos voluntários
            
              </li>
            </div>
          </ul>

          {/* INFORMAÇÕES PARA O VOLUNTÁRIO  */}
          <h4 className="volunteer-title">Informações</h4>
          <ul className="align-volunteers-info">
            <div className="icon-text">
              <li>
                <img src={volunteers} alt={"Volunteers"} />
                Nas primeiras visitas, o ideal é estar 
                <br />
                acompanhado por voluntários antigos 
                 <br />
                para receber as devidas orientações
              </li>
              <li>
                <img src={clock} alt={"Clock"} />
                Geralmente vamos no abrigo todos os
                <br />
                dias a partir das 08:00 da manhã
              </li>
              <li>
                <img src={whatsApp} alt={"WhatsApp"} />
                Após preencher o formulário, acesse o
                <br />
                grupo no WhatsApp com os demais
                <br />
                voluntários para se integrar 
                <br />
                e receber atualizações.
              </li>
            </div>
          </ul>

          {/* FORMULÁRIO PARA SER VOLUNTÁRIO */}
          <h4 className="form-title">Preencha o formulário</h4>
          <div className="align-checkbox">
            <div
              id="over-18"
              className="checkbox-form"
              onClick={() => setSelectedOption("over-18")}
              style={{
                backgroundColor:
                  selectedOption === "over-18" ? "#5BB656" : "white",
              }}
            ></div>
            <p onClick={() => setSelectedOption("over-18")}>Sou maior de 18 anos</p>
            <div
              id="under-18"
              className="checkbox-form"
              onClick={() => setSelectedOption("under-18")}
              style={{
                backgroundColor:
                  selectedOption === "under-18" ? "#5BB656" : "white",
              }}
            ></div>
            <p onClick={() => setSelectedOption("under-18")}>Sou menor de 18 anos</p>
          </div>
          <section className="text-form">
            {selectedOption === "over-18" && (
              <FormOver18 />
            )}

            {selectedOption === "under-18" && (
              <FormUnder18 />
            )}
          </section>
        </section>
      </main>

      <Menu currentPage="volunteers" />
      <Footer />
    </div>
  );
}

export default Volunteers;
