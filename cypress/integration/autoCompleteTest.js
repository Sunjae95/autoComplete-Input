describe('My First Test', () => {
  it('AutoCompleteInput 실행', () => {
    cy.visit('https://autocomplete-sunjae.netlify.app/');
    cy.url().should('include', '/');
  });

  it('"가" 입력', () => {
    cy.intercept(
      'GET',
      'https://5qfov74y3c.execute-api.ap-northeast-2.amazonaws.com/web-front/autocomplete?value=%EA%B0%80'
    ).as('getResult');
    cy.get('.autoComplete__input').type('가');
    cy.wait('@getResult');
    cy.get('.results > .results__item').should(($list) => {
      expect($list).to.have.length(4);
      expect($list.eq(0)).to.contain('가타카');
      expect($list.eq(1)).to.contain('강철비');
      expect($list.eq(2)).to.contain('강철비2');
      expect($list.eq(3)).to.contain('기생충');
    });
  });

  it('↑ 입력', () => {
    cy.get('.autoComplete__input').type('{upArrow}');
    cy.get('.autoComplete__input').type('{upArrow}');
    cy.get('.autoComplete__input').type('{upArrow}');
    cy.get('.autoComplete__input').type('{upArrow}');
  });

  it('↓ 입력', () => {
    cy.get('.autoComplete__input').type('{downArrow}');
    cy.get('.autoComplete__input').type('{downArrow}');
    cy.get('.autoComplete__input').type('{downArrow}');
    cy.get('.autoComplete__input').type('{downArrow}');
  });

  it('focus In & Out', () => {
    cy.get('.autoComplete__input').blur();
    cy.get('.autoComplete__input').focus();
  });

  it('Clear Button', () => {
    cy.get('.autoComplete__clear-btn').click();
  });

  it('"나" 입력', () => {
    cy.intercept(
      'GET',
      'https://5qfov74y3c.execute-api.ap-northeast-2.amazonaws.com/web-front/autocomplete?value=%EB%82%98'
    ).as('getResult');
    cy.get('.autoComplete__input').type('나');
    cy.wait('@getResult');
    cy.get('.results > .results__item').should(($list) => {
      expect($list).to.have.length(3);
      expect($list.eq(0)).to.contain('나이브즈 아웃');
      expect($list.eq(1)).to.contain('나를 찾아줘');
      expect($list.eq(2)).to.contain('나 다니엘 블레이크');
    });
  });

  it('"가" 재입력', () => {
    cy.intercept(
      'GET',
      'https://5qfov74y3c.execute-api.ap-northeast-2.amazonaws.com/web-front/autocomplete?value=%EA%B0%80'
    ).as('getResult');
    cy.get('.autoComplete__input').clear().type('가');
    cy.get('.results > .results__item').should(($list) => {
      expect($list).to.have.length(4);
      expect($list.eq(0)).to.contain('가타카');
      expect($list.eq(1)).to.contain('강철비');
      expect($list.eq(2)).to.contain('강철비2');
      expect($list.eq(3)).to.contain('기생충');
    });
  });

  it('공백 입력', () => {
    cy.get('.autoComplete__input').clear();
  });
});
