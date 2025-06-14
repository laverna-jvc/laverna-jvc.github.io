// src/components/Footer.js
import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
// Импортируем логотип
import logoImage from '../assets/logo_white.svg';

const FooterContainer = styled.footer`
  background-color: #000;
  color: white;
  padding: 3rem 2rem;
`;

const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
`;

const ColumnTitle = styled.h3`
  font-size: 1.25rem;
  margin-bottom: 1.5rem;
`;

const LinkList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const LinkItem = styled.li`
  margin-bottom: 0.75rem;
`;

const Link = styled.a`
  color: #ccc;
  text-decoration: none;
  transition: color 0.2s;
  
  &:hover {
    color: white;
    text-decoration: underline;
  }
`;

const Copyright = styled.div`
  margin-top: 3rem;
  text-align: center;
  color: #aaa;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  padding-top: 1.5rem;
  max-width: 1000px;
  margin-left: auto;
  margin-right: auto;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const SocialLink = styled.a`
  color: white;
  font-size: 1.5rem;
  
  &:hover {
    color: #ddd;
  }
`;
const LogoContainer = styled.div`
  display: flex;
  align-items: center;
`;

const LogoImage = styled.img`
  height: 40px;
  width: auto;
  margin-bottom: 1.5rem;
  
  @media (max-width: 768px) {
    height: 30px;
  }
`;

const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <FooterContainer>
      <Container>
        <Column>
          <ColumnTitle>JVC</ColumnTitle>
          <LinkList>
            <LinkItem>
              <Link href="#home">{t('nav.home')}</Link>
            </LinkItem>
            <LinkItem>
              <Link href="#stores">{t('nav.stores')}</Link>
            </LinkItem>
            <LinkItem>
              <Link href="#marketplaces">{t('nav.marketplaces')}</Link>
            </LinkItem>
            <LinkItem>
              <Link href="#about">{t('nav.about')}</Link>
            </LinkItem>
          </LinkList>
        </Column>
        
        <Column>
          <ColumnTitle>{t('footer.products')}</ColumnTitle>
          <LinkList>
            <LinkItem>
              <Link href="https://lt.jvc.com/mobile-entertainment/">Audio</Link>
            </LinkItem>
            <LinkItem>
              <Link href="http://jvcpro.eu/home/video/">Video</Link>
            </LinkItem>
            <LinkItem>
              <Link href="https://lt.jvc.com/projectors/">Projectors</Link>
            </LinkItem>
            <LinkItem>
              <Link href="https://lt.jvc.com/headphones/">Accessories</Link>
            </LinkItem>
          </LinkList>
        </Column>
        
        <Column>
          <ColumnTitle>{t('footer.contacts')}</ColumnTitle>
          <LinkList>
            <LinkItem>
              <Link href="mailto:info@jvc-distributor.com">info@jvc-distributor.com</Link>
            </LinkItem>
            <LinkItem>
              <Link href="tel:+37012345678">+370 1234 5678</Link>
            </LinkItem>
          </LinkList>
          
          <SocialLinks>
            <SocialLink href="#" aria-label="Facebook">
              <i className="fa fa-facebook-square"></i>
            </SocialLink>
            <SocialLink href="#" aria-label="YouTube">
              <i className="fa fa-youtube-play"></i>
            </SocialLink>
          </SocialLinks>
        </Column>
      </Container>
      
      <Copyright>
        © {currentYear} {t('footer.copyright')}
      </Copyright>
    </FooterContainer>
  );
};

export default Footer;