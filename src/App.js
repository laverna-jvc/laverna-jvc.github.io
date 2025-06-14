// src/App.js
import React, { useState, useEffect } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import Footer from './components/Footer';
// import logoImage from './assets/logo.svg';
// import decorationImage from './assets/bg2.svg';
import LanguageSwitcher from './components/LanguageSwitcher';
import StoreList from './components/StoreList';
import MarketplaceList from './components/MarketplaceList';
import { useTranslation } from 'react-i18next';
import './i18n';
import axios from 'axios';

const logoImage = '/assets/logo.svg'
const decorationImage = '/assets/bg2.svg'

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  
  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
    line-height: 1.6;
    background-color: #f8f9fa;
    color: #212529;
    scroll-behavior: smooth;
  }
  
  a {
    color: #0066ff;
    text-decoration: none;
    transition: all 0.2s;
    
    &:hover {
      color: #0044cc;
    }
  }

  html {
    scroll-behavior: smooth;
  }
`;

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  position: relative;
  overflow: hidden;
`;

const GradientBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4e9f2 100%);
  z-index: -2;
`;

const BackgroundPattern = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: radial-gradient(rgba(0, 0, 0, 0.03) 1px, transparent 1px);
  background-size: 20px 20px;
  z-index: -1;
`;

const HeaderContainer = styled.header`
  padding: 1.5rem 0rem;
  display: flex;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(8px);
  position: sticky;
  top: 0;
  z-index: 100;
  background-color: rgba(255, 255, 255, 0.8);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
`;

const Header = styled.div`
  width: 100%;
  max-width: 1200px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
`;

const LogoImage = styled.img`
  height: 36px;
  width: auto;
  
  @media (max-width: 768px) {
    height: 28px;
  }
`;

const MainContent = styled.main`
  flex: 1;
  padding: 2rem;
  padding-bottom: 1rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
`;

const SectionTitle = styled.h2`
  color: #212529;
  font-size: 0.9rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  padding: 1rem 1.5rem;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(8px);
  border-radius: 10px 10px 0 0;
  margin: 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
`;

const SectionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 100%;
  margin-top: 2rem;
`;

const Section = styled.section`
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border-radius: 10px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  height: 100%;
  max-height: 294px;
  
  // &:hover {
    // transform: translateY(-5px);
    // box-shadow: 0 12px 40px rgba(0, 0, 0, 0.1);
  // }

  @media (max-width: 768px) {
    max-height: 500px;
  }
`;

const Hero = styled.div`
  display: flex;
  position: relative;
  margin-bottom: 0;
  border-radius: 16px;
  overflow: hidden;
  background: #1a1a1a;
  box-shadow: 0 20px 80px rgba(0, 0, 0, 0.1);
  
  @media (max-width: 992px) {
    flex-direction: column;
  }
`;

const HeroLeftContent = styled.div`
  position: relative;
  flex: 0 0 50%;
  padding: 3rem;
  background: #1a1a1a;
  
  @media (max-width: 992px) {
    width: 100%;
    padding: 2.5rem;
  }
  
  @media (max-width: 576px) {
    padding: 2rem;
  }
`;

const HeroRightContent = styled.div`
  flex: 0 0 50%;
  position: relative;
  overflow: hidden;
  display: flex;
  justify-content: stretch;
  align-items: stretch;
  
  @media (max-width: 992px) {
    height: 300px;
  }
`;

const ImageContainer = styled.div`
  flex: 1;
  position: relative;
  overflow: hidden;
`;

// Элемент создающий плавный переход справа налево
const LeftGradientOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%; /* Ширина области перехода */
  height: 100%;
  background: linear-gradient(to right, #1a1a1a 0%, rgba(26, 26, 26, 0.9) 30%, rgba(26, 26, 26, 0.7) 60%, rgba(26, 26, 26, 0.5) 75%, rgba(26, 26, 26, 0.3) 85%, rgba(26, 26, 26, 0) 100%);
  z-index: 3;
  pointer-events: none; /* Чтобы не мешало нажатиям */
  
  @media (max-width: 992px) {
    width: 100%;
    height: 80px;
    background: linear-gradient(to bottom, #1a1a1a 0%, rgba(26, 26, 26, 0.9) 30%, rgba(26, 26, 26, 0.7) 60%, rgba(26, 26, 26, 0.5) 75%, rgba(26, 26, 26, 0.3) 85%, rgba(26, 26, 26, 0) 100%);
  }
`;

const StoreImage = styled.div`
  width: 100%;
  height: 100%;
  background-image: url(${props => props.$imageUrl});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

const TitleContainer = styled.div`
  margin-bottom: 4rem;
`;

const Title = styled.h1`
  color: #fff;
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 1rem;
  letter-spacing: -0.02em;
  line-height: 1.2;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
  
  @media (max-width: 468px) {
    font-size: 1.8rem;
  }
`;

const SubTitle = styled.p`
  color: rgba(255, 255, 255, 0.9);
  font-size: 1.25rem;
  font-weight: 400;
  margin: 0;
`;

const ContactInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 2rem;
`;

const ContactItem = styled.div`
  display: flex;
  gap: 0.75rem;
  color: rgba(255, 255, 255, 0.9);
  
  i {
    min-width: 20px;
    font-size: 1.25rem;
  }
  
  a {
    color: rgba(255, 255, 255, 0.9);
    text-decoration: none;
    transition: color 0.2s;
    display: flex;
	align-items: center;
	
    &:hover {
      color: #fff;
      text-decoration: underline;
    }
  }
  
  span {
    display: flex;
	align-items: center;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
`;

const SocialLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  color: white;
  font-size: 1.1rem;
  transition: all 0.2s;
  
  &:hover {
    color: #fff;
    transform: translateY(-2px);
  }
`;

const ContentLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
	 gap: 0rem;
  }
`;

const Copyright = styled.div`
  color: #6c757d;
  font-size: 0.9rem;
  text-align: center;
  margin-top: 3rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(0, 0, 0, 0.05);
`;

function App() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();
// В компоненте App.js, функция компонента App
const [contactInfo, setContactInfo] = useState({
  address: '-',
  email: '-',
  phone: '-',
  heroImage: null,
  facebookUrl: '#',
  youtubeUrl: '#'
});

// Обновляем функцию fetchContactInfo в useEffect
useEffect(() => {
  axios.get('/data/contact.json')
    .then(res => setContactInfo(res.data))
    .catch(err => console.error('Error loading contact.json:', err));
}, []);

  return (
    <>
      <GlobalStyle />
      <GradientBackground />
      <BackgroundPattern />
      <AppContainer>
        <HeaderContainer>
          <Header>
            <LogoContainer>
              <LogoImage src={logoImage} alt="JVC Logo" />
            </LogoContainer>
            <LanguageSwitcher />
          </Header>
        </HeaderContainer>
        
        <MainContent>
          <Hero>
            <HeroLeftContent>
              <TitleContainer>
                <Title>{t('home.title')}</Title>
                <SubTitle>{t('home.subTitle')}</SubTitle>
              </TitleContainer>
              
              <ContactInfoContainer>
                <ContactItem>
                  <i className="uil uil-map-marker"></i>
                  <span>{contactInfo.address}</span>
                </ContactItem>
                
                <ContactItem>
                  <i className="uil uil-envelope"></i>
                  <a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a>
                </ContactItem>
                
                <ContactItem>
                  <i className="uil uil-phone-alt"></i>
                  <span>{contactInfo.phone}</span>
                </ContactItem>
                
				<SocialLinks>
				  <SocialLink href={contactInfo.facebookUrl} aria-label="Facebook" target="_blank" rel="noopener noreferrer">
					<i className="uil uil-facebook-f"></i>
				  </SocialLink>
				  <SocialLink href={contactInfo.youtubeUrl} aria-label="YouTube" target="_blank" rel="noopener noreferrer">
					<i className="uil uil-youtube"></i>
				  </SocialLink>
				</SocialLinks>
              </ContactInfoContainer>
            </HeroLeftContent>
            
            <HeroRightContent>
              <ImageContainer>
                <StoreImage $imageUrl={contactInfo.heroImage || null} />
                <LeftGradientOverlay />
              </ImageContainer>
            </HeroRightContent>
          </Hero>
          
          <ContentLayout>
            <SectionsContainer>
              <Section>
                <SectionTitle>{t('stores.title')}</SectionTitle>
                <StoreList />
              </Section>
            </SectionsContainer>
            
            <SectionsContainer>
              <Section>
                <SectionTitle>{t('marketplaces.title')}</SectionTitle>
                <MarketplaceList />
              </Section>
            </SectionsContainer>
          </ContentLayout>
          
          <Copyright>
            © {currentYear} {t('footer.copyright')}
          </Copyright>
        </MainContent>
        
      </AppContainer>
    </>
  );
}

export default App;