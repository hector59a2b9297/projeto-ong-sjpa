import React from 'react';

import NavBar from '../../../components/navbar/NavBar';
import ContentHero from '../../../components/contentHero/ContentHero';
import Menu from '../../../components/menu/Menu';
import Footer from '../../../components/footer/Footer';

import maps_icon from '../../../assets/icons/maps.svg';
import whatsapp_icon from '../../../assets/icons/whatsapp.svg';
import email_icon from '../../../assets/icons/green_email.svg';
import instagram_icon from '../../../assets/icons/green_instagram.svg';
import link_icon from '../../../assets/icons/link.svg';

import './styles.css';

function Contact() {
  return (
    <div className='page_container'>
      <NavBar />

      <div className='contact-page-container'>
        <ContentHero
           title ="Entre em contato e faça parte dessa causa" 
           subtitle="Juntos podemos fazer a diferença!" 
           text="Você ama os animais e quer ajudar a proporcionar uma vida melhor para eles?"
           text2="Nossa ONG está comprometida em cuidar e encontrar lares amorosos para animais abandonados. Precisamos do seu apoio!"    
        />
        
        <main className="contact-page-main">
          <h2 className="title-page">Como nos encontrar</h2>
          <h1 className="subtitle-page">Fale conosco</h1>

          <section className="address">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3705.664113657807!2d-43.446819524338544!3d-21.75454368008266!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x989928e47f698d%3A0xe2f61fb1e1d6662c!2sONG%20SJPA!5e0!3m2!1spt-BR!2sbr!4v1724877140399!5m2!1spt-BR!2sbr" 
              width="500" 
              height="300" 
              loading="lazy" 
              referrerpolicy="no-referrer-when-downgrade"
              title='Maps'
            ></iframe>

            <div className='address-text'>
              <div>
                <h3>Endereço</h3>

                <img src={maps_icon} alt="Maps" />
              </div>

              <p>
                BR 040, km 787 - São Pedro <br /> <br />
                CEP 36039-080, Juiz de Fora - MG
              </p>
            </div>
          </section>

          <section className="contacts">
            <div className="whatsapp">
              <div className='contacts-title'>
                <h3>Whatsapp</h3>

                <img src={whatsapp_icon} alt="Whatsapp" style={{ width: '13%' }} />
              </div>

              <div className="whatsapp-link">
                <p>Responsável: Elenir da Silva Silveira</p> <br /> <br />
                <a className='contact-link' href="https://api.whatsapp.com/send?phone=553299655493">
                  <div>
                    <img src={link_icon} alt="Link" /> 
                    <p>+55 (32) 9965-5493</p>
                  </div>
                </a>
              </div>
            </div>

            <div className="email">
              <div className='contacts-title'>
                <h3>Email</h3>

                <img src={email_icon} alt="Email" />
              </div>

              <p>ladynegaomimosa@gmail.com</p>
            </div>

            <div className="instagram">
              <div className='contacts-title'>
                <h3>Instagram</h3>

                <img src={instagram_icon} alt="Instagram" style={{ marginLeft: '5%' }}  />
              </div>

              <a className='contact-link' href="https://www.instagram.com/ong_sjpa/">
                <img src={link_icon} alt="Link" />
                <p>ong_sjpa</p>
              </a>
            </div>
          </section>

          <section className="questions">
            <h3>Dúvidas Frequentes</h3>

            <details>
              <summary>Eu preciso buscar o animal no Instituto ou vocês o trazem até minha casa?</summary>
              <div>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odio, nulla veniam? Non odit qui magni inventore quo deserunt eius labore iusto rem culpa, dignissimos eum. Asperiores reiciendis dolore perferendis iure.</p>
              </div>
            </details>

            <details>
              <summary>Posso adotar mais de um animal?</summary>
              <div>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odio, nulla veniam? Non odit qui magni inventore quo deserunt eius labore iusto rem culpa, dignissimos eum. Asperiores reiciendis dolore perferendis iure.</p>
              </div>
            </details>

            <details>
              <summary>Apenas pessoas de Juiz de Fora podem adotar?</summary>
              <div>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odio, nulla veniam? Non odit qui magni inventore quo deserunt eius labore iusto rem culpa, dignissimos eum. Asperiores reiciendis dolore perferendis iure.</p>
              </div>
            </details>
            
            <details>  
              <summary>Como posso ser um patrocinador?</summary>
              <div>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odio, nulla veniam? Non odit qui magni inventore quo deserunt eius labore iusto rem culpa, dignissimos eum. Asperiores reiciendis dolore perferendis iure.</p>
              </div>
            </details>
          </section>
        </main>
      </div>

      <Menu />
      <Footer />
    </div>
  );
}

export default Contact;