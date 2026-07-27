// Dados do Aplicativo de Estudos PP-RN
const database = {
    comparativo: [
        {
            tema: "Ingresso e Requisitos Básicos",
            lc122: "Art. 7º: Requisitos básicos - nacionalidade brasileira, direitos políticos, quitação militar/eleitoral, nível de escolaridade, idade mínima de 18 anos, aptidão física e mental.",
            lc566: "Art. 16: Exige os mesmos requisitos e acrescenta: não registrar sentença penal condenatória transitada em julgado (inciso IV); conduta social ilibada (VI); aptidão psicológica (VII); CNH (VIII); diploma de nível superior (IX).",
            diferenca: "A LC 566 traz requisitos MUITO MAIS rigorosos e específicos (nível superior, CNH, conduta ilibada, não ter condenação penal).",
            prevalece: "LC 566",
            observacao: "Pegadinha comum: A banca pode dizer que basta nível médio ou que não exige CNH. Para Policial Penal (LC 566), exige SUPERIOR e CNH!"
        },
        {
            tema: "Estágio Probatório (Prazo)",
            lc122: "Art. 20: 24 (vinte e quatro) meses.",
            lc566: "Art. 25: 3 (três) anos de efetivo exercício.",
            diferenca: "LC 122 fala em 24 meses. A LC 566 atualizou para 3 anos (adequação à CF/88 pós-EC 19).",
            prevalece: "LC 566 e CF/88",
            observacao: "Na prova, a regra da LC 566 (3 anos) prevalece e é a que será cobrada para a carreira."
        },
        {
            tema: "Estágio Probatório (Fatores Avaliados)",
            lc122: "Art. 20: assiduidade, pontualidade, disciplina, capacidade de iniciativa, produtividade, responsabilidade, probidade, interesse pelo serviço.",
            lc566: "Art. 25, § 2º: Determina acompanhamento pela chefia imediata com avaliações periódicas para subsidiar avaliação final.",
            diferenca: "A LC 566 não elenca fatores diferentes exaustivamente, mas reforça a avaliação periódica subsidiária.",
            prevalece: "Aplicação conjunta",
            observacao: "Usa-se a LC 122 subsidiariamente nos quesitos avaliativos que não confrontem o regulamento próprio da SEAP."
        },
        {
            tema: "Estabilidade",
            lc122: "Art. 21: Adquire estabilidade após 02 (dois) anos de efetivo exercício.",
            lc566: "Art. 25 e 26: Ato declaratório de estabilidade após aprovação no estágio probatório (3 anos).",
            diferenca: "Prazo de aquisição (2 anos na LC 122 vs 3 anos na regra atual da LC 566 e CF).",
            prevalece: "LC 566 (3 anos)",
            observacao: "Atenção ao art. 21 da LC 122 que está inconstitucional perante a EC 19/98. A prova cobrará os 3 anos."
        },
        {
            tema: "Regime de Trabalho e Jornada",
            lc122: "Art. 19: 40 (quarenta) horas semanais.",
            lc566: "Art. 55: Regime de plantão, não podendo exceder a 160 (cento e sessenta) horas mensais. Plantão de 24h x 72h de folga.",
            diferenca: "Regra geral civil: 40h semanais. Regra especial Policial Penal: Plantão (24x72), máx 160h mensais.",
            prevalece: "LC 566",
            observacao: "Policial Penal faz jus a 1 plantão de folga a cada mês para compensar excedentes (Art 55, §2º da LC 566)."
        },
        {
            tema: "Posse e Exercício (Prazos)",
            lc122: "Art. 13, § 3º: Posse em 30 dias (prorrogável por mais 30). Exercício (Art. 16): 30 dias.",
            lc566: "Art. 23: Confirma a regra de que o exercício dar-se-á em 30 dias contados da posse.",
            diferenca: "Não há divergência sobre o prazo de exercício (30 dias em ambas). Para a posse aplica-se a LC 122 (30 + 30).",
            prevalece: "Regra Unificada",
            observacao: "Lembrete: Posse 30 dias (+30 prorrogável). Exercício 30 dias (LC 566 Art. 23, §1º confirma)."
        },
        {
            tema: "Remoção",
            lc122: "Art. 36: Deslocamento do servidor, a pedido ou de ofício, no âmbito do mesmo quadro, com ou sem mudança de sede.",
            lc566: "Art. 43: Prevê remoção a pedido, por permuta, para acompanhamento de cônjuge (independente de vaga), motivo de saúde, conveniência da administração e ex officio.",
            diferenca: "LC 566 detalha exaustivamente as formas de remoção. Inova ao dizer que remoção não pode ser usada como punição (Art. 44).",
            prevalece: "LC 566",
            observacao: "Pegadinha: A banca dirá que a remoção pode ser usada para punir. FALSO! Art. 44 veda a remoção como forma de punição."
        },
        {
            tema: "Remuneração: Vencimento vs Subsídio",
            lc122: "Art. 39: Composta de vencimento básico + vantagens pecuniárias (indenizações, gratificações, adicionais).",
            lc566: "Art. 36 e 38: Exclusivamente de SUBSÍDIO, fixado em parcela única.",
            diferenca: "O modelo retributivo mudou radicalmente. Policial Penal não recebe 'vencimento' e sim 'subsídio'.",
            prevalece: "LC 566",
            observacao: "Não integra o subsídio: gratificação natalina, adicional de férias, diárias, ajuda de custo (Art. 40)."
        },
        {
            tema: "Adicionais: Periculosidade e Insalubridade",
            lc122: "Art. 76 e 77: Adicionais de atividade penosa (20%), insalubridade (10, 20, 40%) e periculosidade (30%) sobre o vencimento.",
            lc566: "Art. 38: Vedado o acréscimo de qualquer gratificação ou adicional ao subsídio.",
            diferenca: "Para o Policial Penal, a parcela única do subsídio JÁ ENGLOBA as compensações por risco da profissão.",
            prevalece: "LC 566",
            observacao: "Candidato desatento acha que Policial Penal ganha periculosidade à parte. Não ganha, é parcela única!"
        },
        {
            tema: "Promoção vs Progressão",
            lc122: "Art. 22: Promoção é passagem à classe superior imediata (interstício 2 anos). Não há progressão descrita na lei base.",
            lc566: "Art. 28 e 30: Progressão (mudança de letra: 1 ano por antiguidade). Promoção (mudança de nível: 2 anos por mérito/curso).",
            diferenca: "LC 566 diferencia progressão (horizontal/letra) de promoção (vertical/nível).",
            prevalece: "LC 566",
            observacao: "Progressão = Letra (Antiguidade, 1 ano). Promoção = Nível (Mérito, 2 anos, requer 60h de curso)."
        },
        {
            tema: "Deveres Específicos",
            lc122: "Art. 129: Deveres gerais do servidor público (assiduidade, lealdade, sigilo, urbanidade, etc).",
            lc566: "Art. 56: Deveres específicos da Polícia Penal, com 29 incisos.",
            diferenca: "LC 566 traz rol minucioso: revistar, preencher POP, cumprir Lei de Execução Penal, não ofender presos, etc.",
            prevalece: "LC 566 (soma-se à LC 122)",
            observacao: "Os deveres da LC 122 não foram revogados; eles coexistem com os deveres específicos da LC 566."
        },
        {
            tema: "Proibições Específicas",
            lc122: "Art. 130: Ausentar-se sem autorização, recusar fé a documentos, promover apreço/desapreço, exercer comércio.",
            lc566: "Art. 57: Traz 23 proibições voltadas ao cárcere.",
            diferenca: "LC 566 foca na segurança: proibido cobrar carceragem, indicar advogado para preso, não apreender ilícitos na revista.",
            prevalece: "LC 566",
            observacao: "Atenção: Indicar ou insinuar nome de advogado a preso é PROIBIÇÃO expressa (Art. 57, IV) e dá Advertência (Art. 59, II)."
        },
        {
            tema: "Penalidade: Advertência",
            lc122: "Art. 140: Aplicada por escrito na inobservância de dever funcional ou violação de proibições leves.",
            lc566: "Art. 59: Lista taxativamente 6 atos puníveis com advertência.",
            diferenca: "LC 566 inclui: ausentar-se do serviço; indicar advogado; não se apresentar após licença; faltar cursos; permutar horário sem permissão.",
            prevalece: "LC 566 (regras específicas)",
            observacao: "Permutar horário de plantão sem autorização da chefia dá Advertência! É uma das questões mais cobradas."
        },
        {
            tema: "Penalidade: Suspensão",
            lc122: "Art. 141: Até 90 dias para reincidência de advertência e violações médias. Conversível em multa (50%).",
            lc566: "Art. 60: Lista 16 condutas sujeitas a suspensão.",
            diferenca: "A LC 566 tipifica o que é 'falta média': ceder cédula funcional, permitir visitas em horários indevidos, ofender colegas, divulgar assuntos prisionais.",
            prevalece: "LC 566 (e limites de prazo da LC 122)",
            observacao: "Dar, ceder ou emprestar identidade funcional dá SUSPENSÃO (Art. 60, IV)."
        },
        {
            tema: "Penalidade: Demissão",
            lc122: "Art. 143: Crime contra adm, abandono (30 dias), inassiduidade habitual (60 dias em 12 meses), improbidade, insubordinação, corrupção.",
            lc566: "Art. 61: Adiciona causas: promover fuga, receber vantagem, cobrar carceragem, tráfico de drogas, infração penal incompatível.",
            diferenca: "LC 566 fecha o cerco contra a corrupção carcerária e facilita demissão por crimes incompatíveis.",
            prevalece: "Ambas (Rol da LC 566 complementa o da LC 122)",
            observacao: "Promover fuga de presos gera demissão direta (Art. 61, I)."
        },
        {
            tema: "Prisão Cautelar / Provisória",
            lc122: "Art. 48, II: Suspende a remuneração se preso preventivamente ou em flagrante delito.",
            lc566: "Art. 52, II e Art. 54, V: Ser recolhido em dependência ou sala especial quando sujeito a qualquer modalidade de prisão provisória.",
            diferenca: "A LC 566 garante explicitamente a prisão em sala especial/dependência separada até o trânsito em julgado para a segurança do policial penal.",
            prevalece: "LC 566 (prerrogativa especial)",
            observacao: "É um direito basilar do Policial Penal não ser misturado com presos comuns antes da condenação definitiva."
        },
        {
            tema: "Reversão",
            lc122: "Art. 27: Não pode reverter o aposentado que tiver completado 70 (setenta) anos de idade.",
            lc566: "Art. 49: Não pode reverter o Policial Penal aposentado que já tiver completado 65 (sessenta e cinco) anos de idade.",
            diferenca: "O limite de idade para a reversão é menor na LC 566 devido à exigência física da atividade.",
            prevalece: "LC 566 (65 anos)",
            observacao: "Memorize: Reversão na regra geral = até 70 anos. Reversão de Policial Penal = até 65 anos."
        },
        {
            tema: "Elogios Funcionais",
            lc122: "Omissa sobre regras detalhadas de elogio funcional e impacto na carreira.",
            lc566: "Art. 71: Elogio destina-se a ressaltar morte no dever, dedicação excepcional, ou conduta irrepreensível aferida em cada 5 anos sem punição.",
            diferenca: "A LC 566 cria um sistema formal de elogio (inclusive póstumo ou por 5 anos de ficha limpa).",
            prevalece: "LC 566",
            observacao: "Importante: A cada 5 anos sem nenhuma punição, o Policial Penal faz jus a um elogio funcional (Art. 71, III)."
        }
    ],
    diferencas: [
        { desc: "1. Remuneração: A LC 122 prevê vencimento + vantagens. A LC 566 prevê SUBSÍDIO em parcela única." },
        { desc: "2. Requisitos Acadêmicos: LC 122 não exige nível superior como regra; LC 566 exige diploma de nível superior obrigatoriamente." },
        { desc: "3. Requisitos de Trânsito: LC 566 exige Carteira Nacional de Habilitação (CNH), não previsto na LC 122 geral." },
        { desc: "4. Jornada: LC 122 (40h semanais). LC 566 (Plantão 24x72h, máx 160h/mês)." },
        { desc: "5. Estágio Probatório: LC 122 (24 meses). LC 566 (3 anos/36 meses)." },
        { desc: "6. Evolução Funcional: LC 122 possui regras genéricas. LC 566 divide a carreira em Níveis (Promoção a cada 2 anos) e Letras (Progressão a cada 1 ano)." },
        { desc: "7. Avaliação: LC 122 lista fatores genéricos. LC 566 cria Comissão Permanente de Desenvolvimento Funcional." },
        { desc: "8. Acumulação: LC 122 segue estritamente a CF. LC 566 explicita o direito a 1 cargo técnico/prof ou magistério." },
        { desc: "9. Remoção Ex-Officio: LC 566 proíbe explicitamente usar remoção como punição disciplinar." },
        { desc: "10. Remoção na Licença: LC 566 veda remoção ex-officio durante gozo de férias ou licenças." },
        { desc: "11. Diária Operacional: LC 566 autoriza que o Policial Penal faça 'diária operacional' no seu plantão de folga." },
        { desc: "12. Porte de Arma: LC 566 garante o porte de arma de fogo e o fornecimento da arma pelo Estado." },
        { desc: "13. Identidade Funcional: LC 566 equipara a funcional a identidade civil em todo o território nacional." },
        { desc: "14. Deveres: LC 566 lista deveres muito peculiares (conhecer a LEP, tratar o preso com humanidade)." },
        { desc: "15. Penalidades: LC 566 tipifica com precisão as infrações que geram advertência, suspensão e demissão." },
        { desc: "16. Reversão: LC 566 fixa em 65 anos a idade máxima para reverter o aposentado. LC 122 fixava 70." },
        { desc: "17. Adicionais de Insalubridade/Periculosidade: Policiais Penais perdem essas rubricas no contracheque, que são englobadas no subsídio (VPNI em fase de transição)." },
        { desc: "18. Prisão Cautelar: LC 566 garante recolhimento em dependência separada até o trânsito em julgado." },
        { desc: "19. Autoridade Disciplinar: LC 566 delega poder de suspensão de até 30 dias ao Coordenador Executivo." },
        { desc: "20. Dia do Servidor: LC 122 (28/Outubro). LC 566 estabelece 4 de Dezembro como Dia do Policial Penal do RN." },
        { desc: "21. Ajudas de Custo em Plantão: A LC 122 concede ajuda de custo por mudança de sede. A LC 566 detalha que a remoção de ofício garante 30 dias de prazo para mudança." },
        { desc: "22. Requisitos Psicológicos: A LC 566 exige expressamente avaliação psicológica vocacionada para a posse." },
        { desc: "23. Antecedentes: A LC 566 exige ausência de sentença condenatória, independentemente da reabilitação criminal." },
        { desc: "24. Bônus por Ficha Limpa: A LC 566 concede Elogio Funcional compulsório a cada 5 anos sem punições." },
        { desc: "25. Suspensão por recusa médica: LC 566 reduz de 15 dias (regra da lei 8112/122) para a adequação à atividade penitenciária." },
        { desc: "26. Férias: LC 122 permite acúmulo de 2 períodos; LC 566 veda a remoção no período de gozo, reforçando a proteção ao descanso." },
        { desc: "27. Diárias Operacionais (DOs): Exclusividade da LC 566 para quem cumpre regime de plantão no dia de folga para suprir déficit." },
        { desc: "28. Promoção Post-Mortem: A LC 566 prevê expressamente regras para promoção extraordinária em caso de morte no dever." },
        { desc: "29. Carga horária do curso de formação: LC 566 exige aprovação em Curso de Formação como etapa obrigatória do concurso." },
        { desc: "30. Uso de Uniforme/Fardamento: LC 566 exige o uso e determina que o Estado deve prover o fardamento aos Policiais Penais." },
        { desc: "31. Comissão Permanente (CPDF): LC 566 cria comissão específica (CPDF) para avaliar mérito e progressão da categoria." },
        { desc: "32. Porte de arma fora de serviço: LC 566 garante o porte permanente, inerente à atividade de segurança pública." },
        { desc: "33. Gratificação de Risco de Vida: Não existe mais para a Polícia Penal (absorvida pelo Subsídio em Parcela Única)." },
        { desc: "34. Assiduidade no Plantão: Atrasos no plantão geram advertências rápidas (LC 566), diferente do rigor menor na LC 122." },
        { desc: "35. Exame Psicotécnico: LC 566 exige na posse e, em casos específicos, durante a carreira." },
        { desc: "36. TAF (Aptidão Física): Exigência expressa na LC 566 como etapa eliminatória de ingresso." },
        { desc: "37. Vedações Especiais ao Preso: LC 566 proíbe qualquer tipo de negócio, troca ou escambo com internos (Advertência/Suspensão)." },
        { desc: "38. Dever de Revista: LC 566 coloca como dever expresso realizar buscas e revistas periódicas e minuciosas." },
        { desc: "39. Utilização de Presos: LC 566 proíbe terminantemente usar trabalho de presos para serviços particulares (Demissão)." },
        { desc: "40. Tráfico e Drogas: Facilitar a entrada de ilícitos é causa de demissão imediata na LC 566." },
        { desc: "41. Cobrança de Carceragem: LC 566 enfatiza a demissão por receber qualquer valor indevido no recinto prisional." },
        { desc: "42. Atuação em Motim: Dever expresso (LC 566) de atuar na contenção de fugas e motins (a omissão é grave)." },
        { desc: "43. Sigilo Funcional: LC 566 tem punição agravada (Suspensão) para quem vaza informações da segurança prisional." },
        { desc: "44. Imagens Não Autorizadas: LC 566 pune quem divulga imagens de presos ou instalações em redes sociais sem autorização." },
        { desc: "45. Conflito de Interesses: LC 566 veda ao Policial Penal exercer advocacia ou atividades ligadas à criminalística privada." },
        { desc: "46. Exercício de Outra Atividade: LC 566 exige dedicação, permitindo só 1 cargo acumulável (saúde/magistério) e sem choque de plantão." },
        { desc: "47. Elogio Funcional Obrigatório: LC 566 formaliza Elogio para cada 5 anos sem punição na ficha." },
        { desc: "48. Cursos para Promoção: LC 566 exige no mínimo 60h de cursos de qualificação para mudar de Nível." },
        { desc: "49. Promoção por Mérito (Nível): Ocorre a cada 2 anos (LC 566), o que é diferente dos critérios abertos da LC 122." },
        { desc: "50. Progressão por Antiguidade (Letra): Ocorre a cada 1 ano, de forma quase automática se não houver PAD." },
        { desc: "51. Vencimento vs Subsídio: LC 566 elimina Vencimento Base + Gratificações, instituindo rubrica única (Subsídio)." },
        { desc: "52. Faltas Injustificadas no Plantão: LC 566 pune com mais celeridade e rigor a ausência em regime de plantão do que o expediente geral (LC 122)." },
        { desc: "53. Transferência de Presos e Escoltas: A LC 566 retira essa atribuição da PM e torna competência e dever exclusivo da Polícia Penal." },
        { desc: "54. Corregedoria Própria: LC 566 reforça a existência de controle interno correcional próprio da SEAP, com ritos disciplinares especializados." },
        { desc: "55. Direção de Unidade Prisional: LC 566 estabelece que os cargos de Diretor e Vice-Diretor devem ser ocupados preferencialmente por Policiais Penais estáveis." },
        { desc: "56. Livre Acesso: LC 566 garante o livre ingresso em locais de diversão e sujeitos a fiscalização quando em serviço, prerrogativa inexistente na LC 122." },
        { desc: "57. Segurança Institucional: LC 566 atribui à Polícia Penal a segurança dos prédios e autoridades ligadas à Execução Penal." },
        { desc: "58. Greve na Segurança Pública: Enquanto a LC 122 prevê greve em termos gerais, o STF e a natureza da Polícia Penal vedam o direito de greve (caráter essencial)." },
        { desc: "59. Delegação de Chefia: LC 566 pune (Suspensão) delegar a presos atribuições de chefia ou liderança nas galerias." },
        { desc: "60. Conversão de Pena em Multa: A LC 122 permite (50%), mas atos graves de risco à segurança na LC 566 dificultam tal benefício." },
        { desc: "61. Escolta Hospitalar: Dever explícito trazido pela LC 566 que afasta alegações de desvio de função." },
        { desc: "62. Controle de Portaria (Revistas): LC 566 impõe como dever rigoroso, punindo a falha em impedir entrada de objetos ilícitos." },
        { desc: "63. Alvará de Soltura: LC 566 pune quem executa ordem de soltura sem checar minunciosamente outros mandados no sistema." },
        { desc: "64. Retenção Cautelar de Arma: LC 566 prevê que o Estado pode reter o armamento em caso de atestado psicológico restritivo." },
        { desc: "65. Atuação em Serviço de Inteligência: LC 566 insere expressamente a Polícia Penal no organograma estadual de inteligência." },
        { desc: "66. Desvio de Função: Chefe que desviar policial penal estritamente para funções burocráticas comete infração (LC 566)." },
        { desc: "67. Cobrança e Extorsão: LC 566 exige Demissão para quem cobrar valores de presos ou familiares para conceder facilidades." },
        { desc: "68. Tratamento Humano: LC 566 lista como dever 'tratar o preso com humanidade e urbanidade'." },
        { desc: "69. Embriaguez: LC 122 fala em embriaguez habitual no serviço. A LC 566 pune embriaguez ou uso de drogas mesmo fora de serviço se expuser a instituição." },
        { desc: "70. Porte de Arma e Bebida: LC 566 pune o Policial Penal que ostentar arma de fogo em locais públicos estando sob efeito de álcool." },
        { desc: "71. Manuseio de Arma: Falhas no manejo e disparos acidentais no interior da unidade prisional geram punições específicas na LC 566." },
        { desc: "72. Apresentação Policial: O servidor preso provisoriamente por outro órgão (PM/Civil) deve ter sua Chefia da SEAP avisada imediatamente." },
        { desc: "73. Prerrogativa de Foro/Cela: Na LC 122 há prisão em quartel para algumas carreiras; LC 566 dá dependência especial em unidade penal." },
        { desc: "74. Terceirização de Fim: LC 566 veda entregar o controle dos pavilhões a agentes terceirizados, atividade fim do Policial Penal." },
        { desc: "75. Avaliação Psicológica Contínua: Diferente do servidor geral (LC 122), o Policial Penal (LC 566) pode ser submetido a avaliações periódicas para manter porte de arma." },
        { desc: "76. Licença para Trato de Interesse Particular: LC 122 suspende o vínculo; LC 566 veda explicitamente a evolução funcional/promoção durante esse afastamento." },
        { desc: "77. Cursos de Aprimoramento: LC 566 condiciona a promoção a 60h de curso (anexo), a LC 122 não tem métrica de curso para todas as carreiras." },
        { desc: "78. Afastamento para Missão: LC 566 permite afastamento para missão de segurança pública (Senappen, por ex.) mantendo o subsídio integral." },
        { desc: "79. Fuga Culposa vs Dolosa: LC 566 pune promoção dolosa de fuga com demissão, e facilitação culposa (negligência) com suspensão pesada." },
        { desc: "80. Omissão de Socorro: LC 566 pune com rigor o Policial Penal que omite socorro imediato a detento ferido ou doente." },
        { desc: "81. Intimidação em PAD: LC 566 pune a intimidação de testemunhas ou colegas no ambiente prisional com demissão." },
        { desc: "82. Periculosidade Criminalística: A LC 566 submete o Policial a regras de conduta criminal e social contínuas para manutenção do cargo." },
        { desc: "83. Remessa de Atestado de Conduta: LC 566 pune o retardo proposital do envio de relatórios de conduta carcerária ao Juiz da Execução Penal." },
        { desc: "84. Falsificação Prisional: Falta grave tipificada na LC 566 para quem altera relatórios de plantão, livros ou Procedimento Operacional Padrão (POP)." },
        { desc: "85. Assédio a Familiares: LC 566 exige Demissão para quem usa a função para obter vantagens ilícitas, financeiras ou sexuais de familiares de presos." },
        { desc: "86. Alojamento: LC 566 obriga o Estado a prover alojamento próprio e adequado (refeições incluídas) ao plantonista, face ao regime de 24h." },
        { desc: "87. Fardamento na Escolta: LC 566 proíbe e pune a realização de escolta externa sem o uso do fardamento completo e equipamento de proteção." },
        { desc: "88. Identidade Pós-Aposentadoria: LC 566 garante ao aposentado portar funcional indicando inatividade, conservando o porte de arma (mediante laudo)." },
        { desc: "89. Auxílio-Funeral Especial: Se morto no dever, a LC 566 garante que as despesas totais (não apenas 1 mês de vencimento) sejam arcadas pelo Estado." },
        { desc: "90. Prisão Disciplinar: É proibida constitucionalmente para civis, e a LC 566 reafirma isso (Polícia Penal não é militar e não sofre prisão administrativa)." },
        { desc: "91. Atividade Sindical: LC 566 proíbe o abandono do plantão carcerário para ações sindicais que deixem a segurança descoberta." },
        { desc: "92. Hierarquia e Disciplina: A LC 566 consagra a hierarquia operacional como pilar intocável, assemelhando-se às forças de segurança pública." },
        { desc: "93. Recusa de Atualização: LC 566 pune com Advertência quem recusa reciclagens obrigatórias de tiro, defesa e direitos humanos." },
        { desc: "94. Trava na Promoção: LC 566 barra a promoção do servidor que esteja respondendo a PAD até o trânsito em julgado na esfera administrativa." },
        { desc: "95. Uso do Brasão: O uso de insígnias e distintivos fora de serviço para obter facilidades (carteirada) é tipificado como quebra de decoro grave." },
        { desc: "96. Sigilo da Escala: A escala de plantão (LC 566) é considerada de acesso restrito (segurança orgânica), punindo-se o vazamento." },
        { desc: "97. Cargo Político Maior: Afastando-se para ser Prefeito/Deputado, a LC 566 impõe o recolhimento do armamento institucional da SEAP." },
        { desc: "98. Suspeição na CPDF: LC 566 veda explicitamente parentes até 3º grau na comissão que avalia a progressão e estágio probatório." },
        { desc: "99. Assunção Plena da Custódia: A LC 566 materializou a saída da PM e Polícia Civil da guarda de cadeias, oficializando a atividade fim na PP-RN." },
        { desc: '100. Natureza da Carreira: A grande síntese da regra da especialidade – a LC 566 cria um regime de "força policial" estrita, não mais um mero "cargo administrativo" da LC 122.' }
    ],
    semelhancas: [
        { desc: "1. Prazo de Posse: 30 dias (prorrogáveis por mais 30)." },
        { desc: "2. Prazo de Exercício: 30 dias após a posse." },
        { desc: "3. Formas de Provimento: Nomeação, Reversão, Reintegração, Recondução, Readaptação e Aproveitamento." },
        { desc: "4. Estabilidade: Ambas admitem que o servidor só perde o cargo por processo administrativo disciplinar (ampla defesa) ou sentença judicial transitada em julgado." },
        { desc: "5. Cancelamento de Penalidade: Advertência cancela em 3 anos; Suspensão cancela em 5 anos." },
        { desc: "6. Processo Administrativo Disciplinar (PAD): O rito procedimental da LC 566 obedece integralmente as normas da LC 122." },
        { desc: "7. Prescrição Disciplinar: Advertência (180 dias); Suspensão (2 anos); Demissão (5 anos)." },
        { desc: "8. Concurso Público: Validade de até 2 anos, prorrogável por igual período." },
        { desc: "9. Responsabilidades: Civil, Penal e Administrativa são independentes." },
        { desc: "10. Readaptação: Se julgado incapaz para o serviço na readaptação, será aposentado." },
        { desc: "11. Abandono de Cargo: Ambas definem como ausência intencional por mais de 30 dias consecutivos." },
        { desc: "12. Inassiduidade Habitual: Ambas definem como falta sem causa por 60 dias interpolados em 12 meses." },
        { desc: "13. Revisão do Processo: Ambas permitem a revisão do processo disciplinar a qualquer tempo por fatos novos." },
        { desc: "14. Aposentadoria por Invalidez (Reversão): A reversão ocorre quando os motivos da invalidez se tornarem insubsistentes por junta médica." },
        { desc: "15. Aproveitamento: É o retorno à atividade do servidor em disponibilidade (mesma definição nas duas leis)." },
        { desc: "16. Vencimento/Subsídio e Penhora: Ambos impenhoráveis, salvo para pagamento de pensão alimentícia." },
        { desc: "17. Consignação em folha: Permitida em ambas normativas, respeitando o limite da margem consignável." },
        { desc: "18. Licença Maternidade/Paternidade: Aplicam-se os mesmos prazos previstos na CF e LC 122 (180 dias / 5 dias)." },
        { desc: "19. Licença para Tratamento de Saúde: Concedida mediante perícia médica oficial do Estado em ambos os casos." },
        { desc: "20. Acumulação Lícita: Ambas respeitam estritamente as exceções da CF (um cargo de professor, etc)." },
        { desc: "21. Ajuda de Custo: Indeniza despesas de instalação e mudança de sede no interesse da administração." },
        { desc: "22. Diárias (Regra Geral): Indeniza despesas extraordinárias de deslocamento temporário fora da sede." },
        { desc: "23. Vacância: Exoneração, demissão, promoção, aposentadoria e falecimento aplicam-se a ambas." },
        { desc: "24. Exoneração a pedido: Pode ocorrer a qualquer momento a pedido do servidor (exceto se respondendo a PAD grave)." },
        { desc: "25. Casamento (Gala): Ausência justificada de 8 dias consecutivos em ambas." },
        { desc: "26. Luto (Nojo): Ausência justificada de 8 dias consecutivos pelo falecimento de cônjuge, pais, filhos ou irmãos." },
        { desc: "27. Doação de Sangue: 1 dia de ausência justificada." },
        { desc: "28. Alistamento Eleitoral: 2 dias justificados para o fim de alistamento." },
        { desc: "29. Suspensão Preventiva (PAD): Afastamento cautelar de até 30 dias prorrogáveis, previsto na LC 122 e aplicável subsidiariamente." },
        { desc: "30. Reincidência Disciplinar: Agrava a aplicação da pena em ambos os diplomas legais." },
        { desc: "31. Cedência no Estágio Probatório: Durante os 3 anos (CF), o servidor não pode ser cedido a outro órgão, sob pena de suspensão do estágio." },
        { desc: "32. Licença para Atividade Política: Ambas garantem afastamento remunerado para concorrer a cargo eletivo (a partir do registro)." },
        { desc: "33. Mandato Eletivo (Vereador): Se houver compatibilidade de horários, acumula remunerações. Se não, afasta-se optando pela remuneração." },
        { desc: "34. Doença em Pessoa da Família: Ambas concedem licença para tratar parente de 1º grau doente, se a assistência for indispensável." },
        { desc: "35. Exercício de Cargo Comissionado: Permite-se opção pela remuneração do cargo efetivo acrescida do valor do cargo em comissão." },
        { desc: "36. Salário-Família: Garantia constitucional para dependentes de servidores de baixa renda (aplica-se a todos os estatutários)." },
        { desc: "37. Lealdade às Instituições: O dever de ser leal às instituições constitucionais e administrativas permeia ambas as leis." },
        { desc: "38. Vedação ao Nepotismo: Princípio constitucional implícito e explícito na adm pública estadual." },
        { desc: "39. Direito de Petição: Qualquer servidor tem direito a requerer, pedir reconsideração e recorrer de decisões administrativas." },
        { desc: "40. Prescrição de Penalidades: O prazo começa a correr da data em que a autoridade toma conhecimento do fato (Art. 159, LC 122)." },
        { desc: "41. Interrupção da Prescrição: A abertura de sindicância ou a instauração de processo disciplinar interrompe a prescrição." },
        { desc: "42. Destituição de Cargo em Comissão: Forma de punição para quem não tem vínculo efetivo mas cometeu infração grave." },
        { desc: "43. Sigilo da Junta Médica: Os laudos e avaliações psiquiátricas/médicas são de caráter sigiloso e restrito." },
        { desc: "44. Configuração de Abandono de Cargo: Ausência não justificada por mais de 30 dias consecutivos em qualquer regime gera demissão." },
        { desc: "45. Sindicância Preliminar: Sempre pode resultar em arquivamento, penalidade leve (advertência) ou conversão em PAD." },
        { desc: "46. Comissão de PAD (3 membros): Obrigatoriamente formada por três servidores estáveis (na PP-RN, preferencialmente policiais penais)." },
        { desc: "47. Independência das Esferas: A absolvição criminal só afasta a punição administrativa se negar a autoria ou a existência do fato." },
        { desc: "48. Reposição ao Erário: Indenizações ou restituições ao Estado podem ser parceladas, não excedendo 10% da remuneração." },
        { desc: "49. Contagem de Tempo de Serviço: Apurado em dias, que serão convertidos em anos, considerado o ano como de 365 dias." },
        { desc: "50. Acidente de Trabalho: O dano físico ou mental sofrido no exercício do cargo gera direitos previdenciários e licenças integrais em ambas." }
    ],
    naoConfunda: [
        {
            falso: "O Policial Penal acumula o Subsídio com o Adicional Noturno e Adicional de Insalubridade.",
            verdadeiro: "Subsídio NÃO permite recebimento de adicionais (insalubridade, noturno, periculosidade, tempo de serviço). Salvo parcela indenizatória ou décimo terceiro."
        },
        {
            falso: "A remoção de um Policial Penal pode ser decretada como pena administrativa de Advertência.",
            verdadeiro: "A LC 566 veda expressamente a remoção como forma de punição."
        },
        {
            falso: "A pena para o Policial Penal que permutar plantão sem autorização da chefia é de Suspensão de 15 dias.",
            verdadeiro: "A permuta de horário sem permissão é infração classificada no rol de ADVERTÊNCIA (Art. 59, V)."
        },
        {
            falso: "O Dia do Policial Penal é comemorado no Dia do Servidor Público (28 de outubro).",
            verdadeiro: "O Dia do Policial Penal tem data própria: 4 de dezembro (LC 566, Art. 73)."
        },
        {
            falso: "A promoção e progressão ocorrem a cada 2 anos.",
            verdadeiro: "Progressão (Letra): 1 ano (Antiguidade). Promoção (Nível): 2 anos (Mérito + 60h cursos)."
        },
        {
            falso: "A idade máxima para a reversão do Policial Penal aposentado é de 70 anos.",
            verdadeiro: "Para o Policial Penal, a idade máxima de reversão é de 65 anos (Art. 49, LC 566)."
        },
        {
            falso: "É garantido ao Policial Penal não ser preso antes do trânsito em julgado.",
            verdadeiro: "O Policial Penal PODE ser preso provisoriamente, mas tem a garantia de ser recolhido em dependência separada dos demais presos comuns."
        },
        {
        falso: "A pena para entregar a identidade funcional a terceiro é demissão imediata.",
        verdadeiro: "Dar, ceder ou emprestar a carteira funcional é infração punível com SUSPENSÃO na primeira ocorrência (Art. 60)."
    },
        {
        falso: "O Policial Penal no estágio probatório de 3 anos é avaliado pelos mesmos exatos quesitos da LC 122 sem especificidades.",
        verdadeiro: "A LC 566 prevê avaliações periódicas e requisitos práticos de aptidão na atividade penitenciária subsidiados pela Comissão."
    },
        {
        falso: "Para entrar no cargo de Policial Penal basta possuir diploma de nível médio.",
        verdadeiro: "É requisito basilar exigido pela LC 566 o diploma de conclusão de curso de Nível Superior."
    },
        {
        falso: "A idade limite de aposentadoria compulsória do policial penal e a idade limite de reversão são as mesmas (75 anos).",
        verdadeiro: "Não confunda: a reversão do policial penal não pode ultrapassar 65 anos de idade (Art. 49, LC 566), enquanto a regra geral de compulsória na CF é 75 anos."
    },
        {
        falso: "Por receber por Subsídio, o Policial Penal perde o direito a receber Décimo Terceiro (Gratificação Natalina) e 1/3 de férias.",
        verdadeiro: "O Subsídio veda adicionais de periculosidade/insalubridade, MAS preserva integralmente os Direitos Sociais como Férias (+1/3) e 13º salário (Art. 40)."
    },
        {
        falso: "Sindicância e Processo Administrativo Disciplinar (PAD) têm a mesma finalidade punitiva e os mesmos prazos (60 dias prorrogáveis).",
        verdadeiro: "Sindicância (até 30d + 30d) é para apurar materialidade ou faltas leves (Advertência). O PAD (60d + 60d) é exigido para faltas graves (Suspensão pesada e Demissão)."
    },
        {
        falso: "O Policial Penal em estágio probatório pode assumir cargo em comissão em outro órgão estadual sem prejuízo do estágio.",
        verdadeiro: "Se cedido a outro órgão sem previsão legal excepcional expressa, o estágio probatório fica suspenso e só é retomado no seu retorno."
    },
        {
        falso: "A absolvição criminal sempre extingue o PAD em andamento.",
        verdadeiro: "A absolvição por FALTA DE PROVAS não extingue o PAD. Somente a absolvição que provar que o fato não ocorreu ou que o servidor não foi o autor (Negativa de Autoria/Fato) tranca a via administrativa."
    }
    ],
    questoes: [
        {
            id: 1,
            enunciado: "Segundo o Estatuto da Carreira de Policial Penal do RN (LC 566/2016), a forma de remuneração da categoria difere substancialmente da regra geral da LC 122/1994. Assinale a alternativa correta:",
            opcoes: [
                "a) O Policial Penal percebe Vencimento Básico acrescido de Adicional de Insalubridade de 40%.",
                "b) A remuneração é composta exclusivamente de subsídio, fixado em parcela única, sendo garantida a irredutibilidade.",
                "c) O Policial Penal é remunerado por subsídio, o qual permite a cumulação com Adicional por Tempo de Serviço (Quinquênio).",
                "d) A LC 566 manteve o sistema remuneratório de vencimentos e vantagens da LC 122 para preservar os direitos adquiridos.",
                "e) O subsídio do Policial Penal será fixado em níveis e letras, permitindo bônus de produtividade trimestral."
            ],
            correta: 1, 
            comentario: "Correta: B. Fundamento: Art. 36 da LC 566/2016. 'A remuneração será composta exclusivamente de subsídio, fixado em parcela única...'"
        },
        {
            id: 2,
            enunciado: "No tocante ao desenvolvimento na carreira do Policial Penal (LC 566), assinale a correta:",
            opcoes: [
                "a) A promoção ocorre a cada 1 ano mediante critério de antiguidade.",
                "b) A progressão é a mudança de nível e a promoção é a mudança de letra.",
                "c) A mudança de letra, denominada progressão, ocorre a cada 1 ano, por antiguidade.",
                "d) É exigida carga horária de 120 horas de cursos para qualquer progressão.",
                "e) O servidor não pode ser promovido se estiver respondendo a um PAD leve."
            ],
            correta: 2,
            comentario: "Correta: C. Fundamento: Art. 28, § 1º da LC 566. A mudança de letra (progressão) ocorre à razão de 1 ano por tempo de exercício. A promoção (mudança de nível) ocorre a cada 2 anos, exigindo 60h de curso."
        },
        {
            id: 3,
            enunciado: "João, Policial Penal, está irritado com uma norma da direção do presídio e aconselha a esposa de um interno a procurar o advogado Dr. Márcio, fornecendo inclusive o cartão do profissional. De acordo com as penalidades da LC 566, João cometeu infração passível, inicialmente, de:",
            opcoes: [
                "a) Demissão a bem do serviço público.",
                "b) Suspensão de 15 a 30 dias.",
                "c) Suspensão de 30 a 90 dias.",
                "d) Advertência.",
                "e) Não há infração, pois trata-se do exercício regular de direito do cidadão."
            ],
            correta: 3,
            comentario: "Correta: D. Fundamento: Art. 59, inciso II, da LC 566 (São atos passíveis de advertência: indicar ou insinuar nome de advogado para assistir pessoa que esteja presa)."
        },
        {
            id: 4,
            enunciado: "Sobre a remoção, é correto afirmar com base na LC 566, aplicando a regra da especialidade sobre a LC 122:",
            opcoes: [
                "a) Pode ser aplicada como punição para isolar servidores infratores.",
                "b) É vedada a remoção ex officio durante o gozo de férias regulamentares.",
                "c) A remoção por permuta ocorrerá com ônus de indenização de transporte para a administração pública.",
                "d) Policiais Penais eleitos para mandato classista não gozam de inamovibilidade.",
                "e) A remoção ex officio não gera direito a ajuda de custo, em nenhuma hipótese."
            ],
            correta: 1,
            comentario: "Correta: B. Fundamento: Art. 45 da LC 566: 'É vedada a remoção ex officio do Policial Penal durante o gozo de férias ou de qualquer licença elencada no art. 88 da LC 122'."
        },
        {
            id: 5,
            enunciado: "O Policial Penal tem carga horária diferenciada. Assinale a correta segundo a LC 566:",
            opcoes: [
                "a) Submete-se a 40 horas semanais com dedicação exclusiva integral, proibida hora extra.",
                "b) Cumpre regime de plantão de 24h x 72h, que não poderá exceder a 160h mensais.",
                "c) Cumpre regime de plantão de 12h x 36h, excedendo obrigatoriamente 200h mensais.",
                "d) A LC 566 remete à LC 122 a regulamentação do plantão carcerário.",
                "e) A jornada é de 6 horas diárias corridas de segunda a sábado."
            ],
            correta: 1,
            comentario: "Correta: B. Fundamento: Art. 55, § 1º da LC 566 estabelece regime de plantão que não pode exceder 160 horas mensais, e que a escala é de 24x72."
        },
        {
            id: 6,
            enunciado: "Segundo a LC 566, o limite etário para a reversão do Policial Penal aposentado por invalidez, cujos motivos da aposentadoria tornarem-se insubsistentes, é de:",
            opcoes: [
                "a) 75 anos, alinhando-se com a aposentadoria compulsória.",
                "b) 70 anos, aplicando-se integralmente a LC 122/1994.",
                "c) 65 anos.",
                "d) 60 anos.",
                "e) Não existe limite etário para a reversão, desde que a junta médica ateste a capacidade laborativa."
            ],
            correta: 2,
            comentario: "Correta: C. Fundamento: Art. 49 da LC 566. 'Não pode reverter o Policial Penal aposentado que já tiver completado 65 (sessenta e cinco) anos de idade'. É uma diferença notável em relação à LC 122 que fixa em 70 anos."
        },
        {
            id: 7,
            enunciado: "Mário, servidor penitenciário, encontra-se preso preventivamente por suspeita de crime inafiançável. Em relação aos direitos previstos na LC 566, ele terá direito a:",
            opcoes: [
                "a) Manutenção integral do subsídio durante a prisão cautelar.",
                "b) Recolhimento em dependência ou sala especial, separado dos demais presos.",
                "c) Responder ao processo em liberdade automática por possuir prerrogativa de foro.",
                "d) Ser transferido para batalhão das Forças Armadas para custódia.",
                "e) Não há privilégio, submetendo-se à cela comum como qualquer preso."
            ],
            correta: 1,
            comentario: "Correta: B. Fundamento: Art. 52, inciso II da LC 566. O Policial Penal tem a prerrogativa de ser recolhido em dependência ou sala especial quando sujeito a qualquer modalidade de prisão provisória."
        },
        {
            id: 8,
            enunciado: "Qual destas condutas praticadas por um Policial Penal é punível expressamente com DEMISSÃO, nos termos da LC 566/2016?",
            opcoes: [
                "a) Permutar horário de serviço sem expressa permissão da autoridade.",
                "b) Indicar nome de advogado a interno.",
                "c) Dar ou ceder cédula de identidade funcional.",
                "d) Promover ou facilitar fuga de presos.",
                "e) Deixar de frequentar cursos obrigatórios."
            ],
            correta: 3,
            comentario: "Correta: D. Fundamento: Art. 61, I da LC 566. Promover ou facilitar fuga de presos é caso de demissão. As demais são: permutar (advertência), indicar advogado (advertência), ceder cédula (suspensão)."
        },
        {
            id: 9,
            enunciado: "Em relação ao Estágio Probatório, a quem compete o ato declaratório de estabilidade após a habilitação do Policial Penal, segundo a LC 566?",
            opcoes: [
                "a) Ao Governador do Estado.",
                "b) Ao Secretário de Estado da Administração Penitenciária (SEAP).",
                "c) Ao Coordenador Executivo da Administração Penitenciária.",
                "d) Ao Juiz da Vara de Execução Penal.",
                "e) Ao Diretor da Unidade Prisional."
            ],
            correta: 1,
            comentario: "Correta: B. Fundamento: Art. 26 da LC 566. 'Compete ao Secretário de Estado da Administração Penitenciária o ato declaratório de estabilidade...'"
        },
        {
            id: 10,
            enunciado: "O Policial Penal Cláudio está com seu período de férias agendado para o mês de outubro. A administração do presídio decide removê-lo, ex-officio, para outra unidade, no dia 05 de outubro, em virtude de uma suposta desobediência não apurada. A conduta da administração foi:",
            opcoes: [
                "a) Lícita, prevalecendo a conveniência do serviço público.",
                "b) Ilícita, porque a remoção de ofício não gera direito à ajuda de custo, ferindo direito adquirido.",
                "c) Ilícita, por dois motivos: veda-se a remoção ex-officio como punição E durante o gozo de férias.",
                "d) Lícita, desde que Cláudio tenha tempo hábil de se deslocar (30 dias).",
                "e) Ilícita, pois toda remoção ex-officio depende de anuência do sindicato da categoria."
            ],
            correta: 2,
            comentario: "Correta: C. Fundamento: Art. 44 da LC 566 veda a remoção como forma de punição. E o Art. 45 veda a remoção ex-officio durante o gozo de férias ou licenças."
        }
    ],
    mapaMental: `
POLÍCIA PENAL RN (LC 566/16 vs LC 122/94)
===================================================

[ INGRESSO ]
 ├─ LC 122: Regras gerais.
 └─ LC 566: Nível Superior, CNH, Sem sentença penal, Conduta ilibada.

[ JORNADA E REGIME ]
 ├─ LC 122: 40 horas semanais.
 └─ LC 566: Plantão 24x72 / Máx 160h mensais.
    └─ Bônus: 1 folga compensatória/mês + Diária Operacional permitida.

[ REMUNERAÇÃO ]
 ├─ LC 122: Vencimento Básico + Adicionais (Insalubridade/Periculosidade).
 └─ LC 566: SUBSÍDIO (Parcela única). Não acumula adicionais no topo.
    └─ Faz jus a: Férias, 13º, Auxílio Funeral, Fardamento, Diárias.

[ DESENVOLVIMENTO ]
 ├─ PROGRESSÃO (Horizontal/Letras): A cada 1 ano (Antiguidade).
 └─ PROMOÇÃO (Vertical/Nível): A cada 2 anos (Mérito + 60h curso).

[ PENALIDADES ESPECÍFICAS (LC 566) ]
 ├─ ADVERTÊNCIA: Indicar advogado, faltar serviço s/ justa causa, permutar plantão s/ autorização.
 ├─ SUSPENSÃO: Emprestar funcional, ofender colegas, vazar informações.
 └─ DEMISSÃO: Promover fuga, Tráfico, Corrupção, Cobrar Custas.

[ REMOÇÃO ]
 ├─ LC 122: Regras de deslocamento padrão.
 └─ LC 566: VEDADO usar como punição! VEDADO remover nas férias/licenças.
`,
    resumo: `
### Resumo Estratégico para Gabaritar - Polícia Penal RN

#### 1. A Aplicação do Princípio da Especialidade
O edital cobra a LC 122 e a LC 566 juntas. A regra de ouro é: **A Lei Especial (LC 566) derroga a Lei Geral (LC 122) naquilo que houver conflito**. Exemplo clássico: o prazo do Estágio Probatório na LC 122 diz 24 meses; a LC 566 (adaptada à CF) prevê **3 anos**. Na prova para a PP-RN, o gabarito é 3 anos.

#### 2. Modelo Remuneratório
O Policial Penal do RN não recebe "vencimento". Ele é remunerado por **SUBSÍDIO** fixado em parcela única. 
*A banca vai tentar te enganar dizendo que ele tem direito a "Adicional de Insalubridade" ou "Quinquênio" no topo.* Isso é falso. O que ele tem direito além do subsídio? Indenizações (Diárias, Ajuda de custo), Gratificação Natalina (13º) e Adicional de férias (1/3).

#### 3. Carreira: Progressão x Promoção
- **Progressão:** É a mudança de letra (horizontal). Ocorre a cada **1 ano**. Critério puramente de *Antiguidade*.
- **Promoção:** É a mudança de Nível (vertical). Ocorre a cada **2 anos**. Critério de *Mérito* e exige pelo menos **60 horas** de cursos de aprimoramento.

#### 4. O Sistema Disciplinar Inovador da LC 566
Não decore as penas da LC 122 antes de devorar as penas da LC 566. A banca vai focar nas infrações típicas do cárcere.
- Dar ou emprestar a credencial? **Suspensão**.
- Fazer "bico" e trocar plantão com o colega sem o chefe autorizar? **Advertência**.
- Aconselhar um detento a usar os serviços do advogado "Dr. Ciclano"? **Advertência**.
- Promover fuga ou cobrar propina/carceragem? **Demissão**.

#### 5. Garantias e Remoção
O Policial Penal obteve uma conquista histórica na lei: **A remoção ex-officio NÃO pode ser usada como punição**. A banca adora colocar uma questão dizendo que "após cometer uma falta leve, a direção o removeu de ofício para outra unidade como castigo". Isso é nulo e vedado pelo Art. 44 da LC 566.
    `
};

// --- FUNÇÕES DE RENDERIZAÇÃO ---

window.renderData = function() {
    renderTabelas();
    renderDiferencas();
    renderSemelhancas();
    renderNaoConfunda();
    renderQuiz();
    
    document.getElementById('mapa-mental-text').textContent = database.mapaMental.trim();
    document.getElementById('resumo-final-content').innerHTML = database.resumo;
};

function renderTabelas() {
    const container = document.getElementById('tabelas-container');
    container.innerHTML = '';
    
    database.comparativo.forEach(item => {
        const card = document.createElement('div');
        card.className = 'glass-card tema-card';
        card.innerHTML = `
            <div class="tema-header">
                <h3 class="tema-title">${item.tema}</h3>
                <span class="badge badge-prevalece">Prevalece: ${item.prevalece}</span>
            </div>
            <div class="comparativo-grid">
                <div class="lei-box">
                    <h4>LC 122/1994 (Regra Geral)</h4>
                    <p>${item.lc122}</p>
                </div>
                <div class="lei-box">
                    <h4>LC 566/2016 (Polícia Penal)</h4>
                    <p>${item.lc566}</p>
                </div>
            </div>
            <div class="diferenca-box">
                <strong>Análise da Diferença: </strong>
                <span>${item.diferenca}</span>
            </div>
            <div class="obs-box">
                <h4><i class="fa-solid fa-lightbulb"></i> Dica de Prova</h4>
                <p>${item.observacao}</p>
            </div>
        `;
        container.appendChild(card);
    });
}

function renderDiferencas() {
    const container = document.getElementById('diferencas-container');
    container.innerHTML = '';
    
    database.diferencas.forEach((item, index) => {
        const card = document.createElement('div');
        card.className = 'list-item glass-card';
        const splitted = item.desc.split(':');
        const title = splitted[0];
        const content = splitted.slice(1).join(':') || '';
        
        card.innerHTML = `
            <div class="item-number">${index + 1}</div>
            <div class="item-content">
                <p><strong>${title}:</strong> ${content}</p>
            </div>
        `;
        container.appendChild(card);
    });
}

function renderSemelhancas() {
    const container = document.getElementById('semelhancas-container');
    container.innerHTML = '';
    
    database.semelhancas.forEach((item, index) => {
        const card = document.createElement('div');
        card.className = 'list-item glass-card';
        const splitted = item.desc.split(':');
        const title = splitted[0];
        const content = splitted.slice(1).join(':') || '';
        
        card.innerHTML = `
            <div class="item-number">${index + 1}</div>
            <div class="item-content">
                <p><strong>${title}:</strong> ${content}</p>
            </div>
        `;
        container.appendChild(card);
    });
}

function renderNaoConfunda() {
    const container = document.getElementById('nao-confunda-container');
    container.innerHTML = '';
    
    database.naoConfunda.forEach((item) => {
        const card = document.createElement('div');
        card.className = 'glass-card';
        card.innerHTML = `
            <div style="color: #ef4444; margin-bottom: 12px;">
                <strong><i class="fa-solid fa-xmark"></i> O que te faz errar:</strong>
                <p>${item.falso}</p>
            </div>
            <div style="color: #22c55e;">
                <strong><i class="fa-solid fa-check"></i> O que é correto:</strong>
                <p>${item.verdadeiro}</p>
            </div>
        `;
        container.appendChild(card);
    });
}

// Simulador State
let currentQuestion = 0;

function renderQuiz() {
    const container = document.getElementById('quiz-container');
    container.innerHTML = '';
    
    if(database.questoes.length === 0) return;
    
    const q = database.questoes[currentQuestion];
    
    const card = document.createElement('div');
    card.className = 'question-card glass-card';
    
    let optionsHtml = '';
    q.opcoes.forEach((opt, idx) => {
        optionsHtml += `<button class="option-btn" data-index="${idx}">${opt}</button>`;
    });
    
    card.innerHTML = `
        <h3 class="question-text">${q.id}. ${q.enunciado}</h3>
        <div class="options-list">
            ${optionsHtml}
        </div>
        <div class="feedback-box" id="feedback-box">
            <h4 id="feedback-title"></h4>
            <p id="feedback-text"></p>
        </div>
        <button class="cta-btn" id="next-q-btn" style="display:none; margin-top: 24px; width: 100%; justify-content: center;">
            ${currentQuestion === database.questoes.length - 1 ? 'Finalizar Simulado <i class="fa-solid fa-flag-checkered"></i>' : 'Próxima Questão <i class="fa-solid fa-arrow-right"></i>'}
        </button>
    `;
    
    container.appendChild(card);
    
    const btns = document.querySelectorAll('.option-btn');
    const feedbackBox = document.getElementById('feedback-box');
    const feedbackTitle = document.getElementById('feedback-title');
    const feedbackText = document.getElementById('feedback-text');
    const nextBtn = document.getElementById('next-q-btn');
    
    btns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            if(feedbackBox.classList.contains('show')) return;
            
            const selectedIdx = parseInt(e.currentTarget.getAttribute('data-index'));
            
            if(selectedIdx === q.correta) {
                e.currentTarget.classList.add('correct');
                feedbackBox.classList.add('success', 'show');
                feedbackTitle.innerHTML = '<i class="fa-solid fa-check-circle"></i> Resposta Correta!';
            } else {
                e.currentTarget.classList.add('wrong');
                btns[q.correta].classList.add('correct');
                feedbackBox.classList.add('error', 'show');
                feedbackTitle.innerHTML = '<i class="fa-solid fa-xmark-circle"></i> Resposta Incorreta!';
            }
            
            feedbackText.textContent = q.comentario;
            nextBtn.style.display = 'flex';
        });
    });
    
    nextBtn.addEventListener('click', () => {
        if(currentQuestion < database.questoes.length - 1) {
            currentQuestion++;
            renderQuiz();
            document.getElementById('quiz-counter').textContent = `Questão ${currentQuestion + 1} de ${database.questoes.length}`;
            const percentage = ((currentQuestion) / database.questoes.length) * 100;
            document.getElementById('quiz-progress-fill').style.width = `${percentage}%`;
        } else {
            document.getElementById('quiz-progress-fill').style.width = '100%';
            container.innerHTML = '<div class="glass-card" style="text-align:center;"><h2>Simulado Concluído!</h2><p>Você finalizou esta bateria de questões. Revise o gabarito comentado para sanar dúvidas.</p><button class="cta-btn" onclick="currentQuestion=0; renderQuiz();" style="margin-top:20px;">Refazer Simulado</button></div>';
        }
    });
}

// Search Logic
const searchInput = document.getElementById('search-tabelas');
if(searchInput) {
    searchInput.addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase();
        const cards = document.querySelectorAll('.tema-card');
        
        cards.forEach(card => {
            const title = card.querySelector('.tema-title').textContent.toLowerCase();
            if(title.includes(term)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
}
