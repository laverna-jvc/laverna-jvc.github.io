// src/components/Footer.js
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import axios from 'axios';
// import logoImage from '../assets/logo_white.svg';

const logoImage = '/assets/logo_white.svg';

const FooterContainer = styled.footer`
  background: linear-gradient(135deg, #141414 0%, #2a2a2a 100%);
  color: white;
  padding: 4rem 2rem 2rem;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 3rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
`;

const LogoImage = styled.img`
  height: 36px;
  width: auto;
  margin-bottom: 1.5rem;
`;

const SectionTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: white;
  position: relative;
  padding-bottom: 0.75rem;
  
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 40px;
    height: 2px;
    background-color: #0066ff;
  }
`;

const FooterText = styled.p`
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.6;
  margin-bottom: 1.5rem;
  font-size: 0.95rem;
`;

const LinkList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const LinkItem = styled.li`
  margin-bottom: 0.75rem;
`;

const FooterLink = styled.a`
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  transition: all 0.2s;
  font-size: 0.95rem;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    color: white;
    transform: translateX(3px);
  }
  
  i {
    font-size: 0.9rem;
  }
`;

const ContactInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.95rem;
  
  i {
    min-width: 20px;
    font-size: 1.1rem;
    color: #0066ff;
  }
  
  a {
    color: rgba(255, 255, 255, 0.7);
    text-decoration: none;
    transition: color 0.2s;
    
    &:hover {
      color: white;
    }
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
    background: #0066ff;
    transform: translateY(-3px);
  }
`;

const Copyright = styled.div`
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.85rem;
  text-align: center;
  margin-top: 3rem;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
`;

const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();
  const [contactInfo, setContactInfo] = useState({
    address: ' ',
    email: ' ',
    phone: ' '
  });

  // Fetch contact info from Strapi
  useEffect(() => {
    const fetchContactInfo = async () => {
      try {
        const strapiURL = process.env.REACT_APP_STRAPI_URL || 'http://localhost:1337';
        const response = await axios.get(`${strapiURL}/api/contact-infos`);
        
        if (response.data && response.data.data) {
          if (Array.isArray(response.data.data) && response.data.data.length > 0) {
            const contactData = response.data.data[0];
            
            if (contactData.address && contactData.email && contactData.phone) {
              setContactInfo({
                address: contactData.address,
                email: contactData.email,
                phone: contactData.phone
              });
            }
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchContactInfo();
  }, []);

  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <LogoImage src={logoImage} alt="JVC Logo" />
          <FooterText>
            {t('home.welcome')}
          </FooterText>
          <SocialLinks>
            <SocialLink href="#" aria-label="Facebook">
              <i className="uil uil-facebook-f"></i>
            </SocialLink>
            <SocialLink href="#" aria-label="YouTube">
              <i className="uil uil-youtube"></i>
            </SocialLink>
            <SocialLink href="#" aria-label="Instagram">
              <i className="uil uil-instagram"></i>
            </SocialLink>
          </SocialLinks>
        </FooterSection>
        
        <FooterSection>
          <SectionTitle>{t('nav.home')}</SectionTitle>
          <LinkList>
            <LinkItem>
              <FooterLink href="#home">
                <i className="uil uil-angle-right"></i>
                {t('nav.home')}
              </FooterLink>
            </LinkItem>
            <LinkItem>
              <FooterLink href="#stores">
                <i className="uil uil-angle-right"></i>
                {t('nav.stores')}
              </FooterLink>
            </LinkItem>
            <LinkItem>
              <FooterLink href="#marketplaces">
                <i className="uil uil-angle-right"></i>
                {t('nav.marketplaces')}
              </FooterLink>
            </LinkItem>
            <LinkItem>
              <FooterLink href="#about">
                <i className="uil uil-angle-right"></i>
                {t('nav.about')}
              </FooterLink>
            </LinkItem>
          </LinkList>
        </FooterSection>
        
        <FooterSection>
          <SectionTitle>{t('footer.products')}</SectionTitle>
          <LinkList>
            <LinkItem>
              <FooterLink href="https://lt.jvc.com/mobile-entertainment/">
                <i className="uil uil-music"></i>
                Audio
              </FooterLink>
            </LinkItem>
            <LinkItem>
              <FooterLink href="http://jvcpro.eu/home/video/">
                <i className="uil uil-video"></i>
                Video
              </FooterLink>
            </LinkItem>
            <LinkItem>
              <FooterLink href="https://lt.jvc.com/projectors/">
                <i className="uil uil-airplay"></i>
                Projectors
              </FooterLink>
            </LinkItem>
            <LinkItem>
              <FooterLink href="https://lt.jvc.com/headphones/">
                <i className="uil uil-headphones"></i>
                Accessories
              </FooterLink>
            </LinkItem>
          </LinkList>
        </FooterSection>
        
        <FooterSection>
          <SectionTitle>{t('footer.contacts')}</SectionTitle>
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
              <i className="uil uil-phone"></i>
              <span>{contactInfo.phone}</span>
            </ContactItem>
          </ContactInfoContainer>
        </FooterSection>
      </FooterContent>
      
      <Copyright>
        © {currentYear} JVC. {t('footer.copyright')}
      </Copyright>
    </FooterContainer>
  );
};

export default Footer;