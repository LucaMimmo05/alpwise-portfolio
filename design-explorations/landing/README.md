# Esplorazioni landing

Un file HTML autonomo per sezione, con le varianti a schede, tema Scuro/Chiaro e "Riproduci". Si aprono serviti da un server locale (gli script non girano da `file://`):

```bash
python3 -m http.server 4321 --directory design-explorations/landing
```

Scelte (24.10.2026): Hero B con testo e parola che cambia di C · Studio A con lettura allo scroll · Servizi C · Per chi A · Metodo A · Lavori B · CTA B con testo e parola che cambia di C, con margine laterale · Contatti A · Footer A.

`_source/` contiene i frammenti e `build.py` per rigenerare gli HTML (`python3 design-explorations/landing/_source/build.py`). `_source/scartate/` tiene Clienti e Domande, tolte dalla pagina.
