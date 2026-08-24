// Template do "CONTRATO DE ADMINISTRAÇÃO EXCLUSIVA DE DIREITOS SOBRE
// MASTERS E DISTRIBUIÇÃO DIGITAL".
//
// Este componente só faz uma coisa: recebe os dados do artista (`dados`)
// e "monta" o texto do contrato substituindo os campos variáveis.
// Ele nunca aparece na tela para o usuário — é renderizado escondido
// e depois convertido em PDF pelo utils/pdfGenerator.js.
//
// IMPORTANTE: o texto jurídico completo (todas as cláusulas) deve ser
// colado aqui a partir do modelo .docx oficial da Tô Na Mídia.
// Abaixo eu deixei a estrutura das duas primeiras cláusulas como
// exemplo do padrão a seguir — copie o restante das cláusulas do seu
// arquivo CONTRATO_DE_DISTRIBUICAO_DIGITAL.docx mantendo esse mesmo
// formato de <p> e <strong>.

function ContratoDistribuicaoTemplate({ dados }) {
  return (
    <div className="document-template">
      <h1>
        CONTRATO DE ADMINISTRAÇÃO EXCLUSIVA DE DIREITOS SOBRE MASTERS E
        DISTRIBUIÇÃO DIGITAL
      </h1>

      <p>
        <strong>De um lado:</strong>
      </p>
      <p>
        <strong>TÔ NA MIDIA DIGITAL LTDA</strong>, pessoa jurídica de
        direito privado, inscrito no CNPJ 02.364.590/0001-67, neste ato
        representado por JOSÉ ANTONIO MEDEIROS FILHO, com sede na Rua
        Geremia Lunardelli 503, Jardim Peri Peri - São Paulo/SP,
        CEP: 05537-100, endereço eletrônico: tonamidia@tonamidia.com.br,
        denominado <strong>CONTRATADO</strong>.
      </p>

      <p>
        <strong>Por outro lado:</strong>
      </p>
      <p>
        <strong>{dados.nomeCompleto}</strong>, {dados.nacionalidade},{' '}
        {dados.estadoCivil}, {dados.profissao}, portador do RG nº{' '}
        {dados.rg}, inscrito no CPF/MF sob o nº {dados.cpf}, residente e
        domiciliado em {dados.endereco}, CEP: {dados.cep}, cujo{' '}
        <strong>pseudônimo artístico é {dados.pseudonimoArtistico}</strong>,
        denominado <strong>CONTRATANTE</strong>.
      </p>

      <h2>CLÁUSULA PRIMEIRA - OBJETO</h2>
      <p>
        O presente contrato tem por finalidade a Administração exclusiva
        sobre masters (fonogramas), distribuição digital em todas as
        plataformas disponíveis e que venham a existir.
      </p>

      <h2>CLÁUSULA SEGUNDA - DISTRIBUIÇÃO</h2>
      <p>
        1. O CONTRATADO se compromete a promover a distribuição digital do
        produto e/ou serviços do CONTRATANTE através de seus websites,
        aplicativos de dispositivos móveis, redes sociais e plataformas
        digitais como YouTube, Instagram, Facebook, Spotify, Deezer e
        outros.Fica ressalvado ao CONTRATANTE acompanhar a divulgação dos serviços ou produtos através plataformas digitais. Em caso de impulsionamento será cobrado à parte, através aceitação de proposta orçada pelo CONTRATADO. 
    <br></br>
2.MASTERS: Fica assegurado a CONTRATADA todos os direitos sobre Masters, cujo pseudônimo “XXXXXXX”, sujeitos a este Contrato todas as gravações sonoras de titularidade, controladas, criadas que incorporem a interpretação do Artista, ora CONTRATANTE, que sejam exploradas ou divulgadas pela CONTRATADA durante vigência do contrato. 
<br></br>
3.Concessão de Direitos: A CONTRATADA (Tô Na Mídia Digital Ltda)  terá os seguintes direitos básicos em conformidade com os Termos e Condições Padrão além dos direitos concedidos no âmbito dos Termos e Condições Padrão:
<br></br>
<br></br>
a.    Direitos exclusivos de Distribuição Digital com relação aos Masters;
<br></br>
b.    Direitos não exclusivos de Licenciamento de Sincronização;
<br></br>
c.    Direitos exclusivos de administração de Execução Pública Digital;
<br></br>
d.    Direitos exclusivos de distribuição digital com relação aos Vídeos;
<br></br>
e.    Direitos exclusivos de Content ID;
<br></br><br></br>
4. Exclusividade: Durante a vigência do contrato, os serviços do Artista (CONTRATANTE) como artista de gravação será exclusivo da Tô Na Mídia Digital   Ltda., de modo que o Artista abster-se-á de gravar e/ou lançar, diretamente ou em associação com terceiros, quaisquer gravações sonoras que incorporem a interpretação do Artista que não sejam distribuídas  pela Tô Na Mídia Digital Ltda. nos termos deste Contrato, exceto com o consentimento prévio por escrito da Tô Na Mídia Digital  Ltda.
      </p>

      <h2>CLÁUSULA TERCEIRA - DA MONETIZAÇÃO E/OU RENDIMENTOS:</h2>
      <p>
        1.Em plena contraprestação aos direitos concedidos à nos termos deste instrumento, e condicionado ao cumprimento pleno e fiel pela CONTRATADA  todos os termos e condições do presente instrumento, a qual  receberá o seguinte pagamento:
<br></br>
<br></br>
        1.1. 50% dos Proventos Líquidos da Distribuição Digital dos Masters;
<br></br>
<br></br>
        1.2. 50% das taxas de licença recebidas pela Tô na Mídia Promoções e Eventos Ltda. atribuídas a Licenciamento de Sincronização;
<br></br>
<br></br>
        1.3. 50% dos Proventos Líquidos dos Royalties da Execução Pública Digital;
<br></br>
<br></br>
        1.4. 50% dos Proventos Líquidos de explorações dos Vídeos através de Plataformas de Terceiros, excluindo-se o YouTube (por exemplo, Apple Music e Vevo);
<br></br>
<br></br>
        1.5. 50% dos Proventos Líquidos de Content ID e exploração dos Vídeos através do YouTube;
<br></br>
<br></br>
      1.6. 50% dos Proventos Líquidos dos Serviços de Admin de Canal do YouTube (excluindo-se Integrações); e
<br></br>
<br></br>
1.7. 50% dos Proventos Líquidos de Integrações.

      </p>

      <h2>CLÁUSULA QUARTA- DAS OBRIGAÇÕES: </h2>
      <p>
        1.O CONTRATANTE se obriga a entregar a CONTRATADA os MASTERS  e os vídeos em formato digital ou eletrônico aprovado pela  Tô Na Mídia Digital Ltda (CONTRATADA) ou em qualquer outro formato aprovado pela Tô Na Mídia Digital Ltda.
<br></br>
2.Ainda, o CONTRATANTE  transferirá à Tô Na Mídia Digital  Ltda. controle sobre a gestão e as funções administrativas do Canal; sendo certo que a CONTRATADA manterá todos os direitos, incluindo a propriedade e responsabilidade absoluta, sobre o Conteúdo YouTube e o Canal. 
<br></br>
3.Poderá a CONTRATADA (Tô Na Mídia Digital Ltda) remover ou exigir que o CONTRATANTE remova qualquer Conteúdo YouTube imediatamente após notificação de violação de direitos autorais, ou violação de direitos de qualquer parte, ou preocupação nesse sentido, ou caso tal Conteúdo  YouTube viole aos termos deste Contrato ou viole quaisquer leis, regras ou regulamentos, incluindo os termos, regras, políticas, diretrizes ou outros interesses empresariais da Tô Na Mídia Digital Ltda. ou do YouTube (ou de sua empresa controladora ou de suas coligadas), conforme determinação exclusiva e razoável de tal parte; 
<br></br>
4.Fica a CONTRATADA obrigada realizar os serviços contratados, dentro do prazo estipulado, ciente que a distribuição e divulgação dos serviços ou produtos não estão vinculados ao sucesso pretendido pelo Artista.
<br></br>
5.A CONTRATADA se obriga a fornecer ao CONTRATANTE planilha ou prestação de contas dos serviços realizados, caso queira, ressalvado que a distribuição se dá através plataforma digital podendo o próprio CONTRATANTE ter acesso as divulgações ou distribuição.
<br></br>
6.A CONTRATADA abster-se-á de editar, remixar, resequenciar ou alterar qualquer Master entregue pelo CONTRATANTE  em qualquer forma, exceto conforme expresso neste instrumento. Todos os direitos não concedidos especificamente à Tô Na Mídia Digital Ltda neste instrumento são reservados expressamente ao CONTRATANTE. 

      </p>


      <h2>CLÁUSULA QUINTA - DA LICENÇA:</h2>
      <p>
        1. Fica assegurado a CONTRATADA o direito e a licença exclusivos para converter, digitalizar, codificar, integrar, criar, causar ou reproduzir os Masters e os Vídeos em qualquer formato digital ou eletrônico conhecido atualmente ou concebido no futuro para fins de distribuição, exploração ou uso dos Masters e dos Vídeos conforme concedidos neste instrumento. E ainda, o direito e a licença exclusivos de digitalmente distribuir, reproduzir, transmitir, licenciar, vender (inclusive, sem limitação, através de download, viastreaming e serviços de assinatura), divulgar, publicar, executar publicamente, transmitir em massa, e usar e explorar os Masters em qualquer formato eletrônico ou digital conhecido atualmente ou concebido no futuro durante o prazo para consumidores em todo o Território através de qualquer plataforma ou serviço, incluindo, sem limitação, seu(s) Site(s) e os sites, plataformas ou serviços de quaisquer Plataformas de Terceiros (“Distribuição Digital”); o direito e a licença exclusivos para explorar e administrar a exploração de áudio, gravações visuais e audiovisuais e outros conteúdos (“UGC”) que incorporem os Masters na Internet através do YouTube ou de outras formas, incluindo, sem limitação, a gestão do Content ID do YouTube com relação aos Masters e a tais UGC, e o acompanhamento, monetização, retirada ou bloqueio de tais UGC na Internet (“Content ID”);
<br></br>
2.Fica o  CONTRATANTE obrigado a criar uma conta na Distribuidora Digital ONErpm, para recebimento dos ROYALTIES;
<br></br>
3.Dessa forma, o CONTRANTE será responsável e pagará todos e quaisquer royalties e outros rendimentos devidos a artistas, artistas convidados, produtores, compositores, editoras e outros com participação nos royalties decorrentes das vendas ou outros usos dos Masters e Vídeos, incluindo, sem limitação, todos os royalties mecânicos devidos aos compositores e/ou editores das composições musicais protegidas por direitos autorais incorporadas aos Masters e Vídeos pelas vendas ou outros usos dos Masters e Vídeos, todos os pagamentos que venham a ser exigidos por acordos de negociação coletiva aplicáveis aos Masters e Vídeos, e quaisquer outros royalties, taxas e/ou valores devidos pela Licenciante com relação ao Conteúdo, a menos que o contratante tenha certificado por escrito que as Plataformas de Terceiros pagaram tais royalties.

      </p>


      <h2>CLÁUSULA SEXTA- DAS DESPESAS:</h2>
      <p>
        1. Fica resguardado a CONTRATADA o ressarcimento de todas e quaisquer despesas e custos diversos incorridos pela (Tô Na Mídia Digital Ltda) e atribuídos diretamente à distribuição, exploração, marketing, promoção, produção. ou divulgação dos Masters, do Canal e/ou do Vídeos. Cabendo a CONTRATADA a devida prestação de contas ao CONTRATANTE que comprovem tais despesas. 

      </p>
      <br>
      
      </br>
      <h2>CLÁUSULA SÉTIMA- PRORROGAÇÃO E RESCISÃO DO CONTRATO :</h2>
      <p>
        1.O presente contrato terá seu início a partir da sua assinatura e continuará por períodos adicionais e sucessivos de 05 (cinco) anos. Do qual poderá ser prorrogado automaticamente, salvo se houver comunicação por escrito por uma das partes no período de 30 (trinta dias) ao vencimento do mesmo.
<br></br>
2. Ficam resguardado as partes o direito de rescindir este Contrato  por arrependimento no prazo de 07 (sete) dias, sem incidência de multa desde que não tenha iniciado os trabalhos.
<br></br>
3. No caso de rescisão deste contrato sem justo motivo por parte do CONTRATANTE após  o  término do prazo estipulado  , conforne descrito no item 2 da clausula sétima, a CONTRATADA terá direito a uma multa. Esta multa será calculada como 100 (cem) vezes o valor do faturamento do último mês do CONTRATANTE. No entanto, se o valor resultante deste cálculo for inferior a R$ 100.000,00 (Cem Mil Reais), será aplicada uma multa mínima de R$ 100.000,00 (Cem Mil Reais), desde que tal valor não seja considerado excessivo ou abusivo de acordo com as leis e regulamentos aplicáveis. Adicionalmente, a CONTRATADA mantém o direito de reter quaisquer valores que sejam devidos ao CONTRATANTE em caso de descumprimento do contrato, para compensação do saldo devedor, respeitando sempre os limites legais.

      </p>

      <h2>CLÁUSULA OITAVA- CONFIDENCIALIDADE: </h2>
      <p>
        1. Os termos e condições deste Contrato são confidenciais e não serão revelados a terceiros (exceto por consultores profissionais) sem o consentimento prévio por escrito da CONTRATADA (Tô Na Mídia Digital Ltda), exceto conforme a divulgação seja exigida pelas leis aplicáveis ou por ação judicial.
      </p>

      <h2>CLÁUSULA  NONA - DISPOSIÇÕES GERAIS:</h2>
      <p>
        1.Este contrato possui caráter irrevogável e irretratável, sendo que as obrigações aqui assumidas obrigam as partes e aos seus sucessores a qualquer titulo. 
<br></br>
2.Havendo concordância entre as partes, ficam ressalvados os direitos de rever e aditar o presente contrato.
<br></br>
3.A CONTRATADA não poderá ceder a terceiros, parcial ou totalmente quaisquer direitos ou obrigações decorrentes deste contrato, sem o consentimento prévio por escrito da outra parte.
<br></br>
4.Quaisquer notificações exigidas ou permitidas referente ao presente contrato deverá ser feito por escrito, seja por Carta Registrada, e-mail, telegramas ou outro.
<br></br>
5.As partes responderão solidariamente todas as obrigações e declarações assumidas e garantidas no presente contrato, seja na esfera cível, trabalhista, federal e criminal. Resguardo a parte inocente o direito de ação de regressiva em desfavor da parte causadora. 
<br></br>
6.Este Contrato será considerado elaborado no Brasil, desconsiderando-se as disposições de conflitos de leis do País vigente, e a validade, a interpretação, o cumprimento contratual.
<br></br>
7. Em qualquer ação ou processo que vise fazer valer ou interpretar este Contrato, a parte vencedora terá direito a obter da parte sucumbente suas custas e despesas (incluindo honorários advocatícios razoáveis) incorridas com relação a tal ação ou processo e ao fazer valer qualquer sentença ou decisão obtida.
<br></br>
8. As Partes elegem o foro da Comarca da Capital do Estado de São Paulo, com exclusão de qualquer outro, por mais privilegiado que seja ou venha a ser, para dirimir quaisquer controvérsias oriundas deste instrumento, em razão de ser o local do domicílio da CONTRATADA, bem como da efetiva prestação dos serviços objeto deste instrumento.
<br></br>
9. As Partes reconhecem, desde já, a competência do foro eleito para processamento e julgamento de toda e qualquer medida judicial relacionada ao presente contrato, inclusive ações de cobrança, execução, cumprimento de obrigação, tutela de urgência, medidas cautelares e discussões acerca de sua validade, interpretação, execução ou rescisão.

      </p>



      <p className="assinatura-local-data">
        São Paulo, {dados.dataAssinatura}.
      </p>

    <div className="assinatura-bloco">
        <p>______________________________________________</p>
        <p>TÔ NA MIDIA DIGITAL LTDA</p>
        <p>CNPJ Nº.  02.364.590/0001-67</p>
        <p>CONTRATADA</p>
      </div>


      <div className="assinatura-bloco">
        <p>______________________________________________</p>
        <p>{dados.nomeCompleto}</p>
        <p>CPF N°. {dados.cpf}</p>
        <p>CONTRATANTE</p>
      </div>
    </div>
  )
}

export default ContratoDistribuicaoTemplate