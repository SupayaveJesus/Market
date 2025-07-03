--
-- PostgreSQL database dump
--

-- Dumped from database version 17.4
-- Dumped by pg_dump version 17.4

-- Started on 2025-07-03 09:35:21

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 4 (class 2615 OID 2200)
-- Name: public; Type: SCHEMA; Schema: -; Owner: pg_database_owner
--

-- CREATE SCHEMA public; -- Commented out to avoid conflict

ALTER SCHEMA public OWNER TO pg_database_owner;

--
-- TOC entry 4884 (class 0 OID 0)
-- Dependencies: 4
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: pg_database_owner
--

COMMENT ON SCHEMA public IS 'standard public schema';


--
-- TOC entry 238 (class 1255 OID 24691)
-- Name: delete_ad_images(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.delete_ad_images() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
  DELETE FROM image WHERE entity_id = OLD.id AND entity_type = 'ad';
  RETURN OLD;
END;
$$;


ALTER FUNCTION public.delete_ad_images() OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 222 (class 1259 OID 16521)
-- Name: ads; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.ads (
    id integer NOT NULL,
    title character varying(200) NOT NULL,
    description text NOT NULL,
    price double precision NOT NULL,
    is_active boolean DEFAULT true,
    is_featured boolean DEFAULT false,
    id_user integer,
    id_category integer,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    deleted_at timestamp without time zone,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.ads OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 16520)
-- Name: ads_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.ads_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.ads_id_seq OWNER TO postgres;

--
-- TOC entry 4885 (class 0 OID 0)
-- Dependencies: 221
-- Name: ads_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.ads_id_seq OWNED BY public.ads.id;


--
-- TOC entry 231 (class 1259 OID 16613)
-- Name: ads_id_seq1; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.ads ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.ads_id_seq1
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 220 (class 1259 OID 16512)
-- Name: category; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.category (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    description text
);


ALTER TABLE public.category OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 16511)
-- Name: category_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.category_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.category_id_seq OWNER TO postgres;

--
-- TOC entry 4886 (class 0 OID 0)
-- Dependencies: 219
-- Name: category_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.category_id_seq OWNED BY public.category.id;


--
-- TOC entry 233 (class 1259 OID 16615)
-- Name: category_id_seq1; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.category ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.category_id_seq1
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 228 (class 1259 OID 16572)
-- Name: conversations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.conversations (
    id integer NOT NULL,
    ad_id integer,
    sender_id integer,
    receiver_id integer
);


ALTER TABLE public.conversations OWNER TO postgres;

--
-- TOC entry 227 (class 1259 OID 16571)
-- Name: conversations_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.conversations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.conversations_id_seq OWNER TO postgres;

--
-- TOC entry 4887 (class 0 OID 0)
-- Dependencies: 227
-- Name: conversations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.conversations_id_seq OWNED BY public.conversations.id;


--
-- TOC entry 236 (class 1259 OID 16618)
-- Name: conversations_id_seq1; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.conversations ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.conversations_id_seq1
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 224 (class 1259 OID 16544)
-- Name: image; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.image (
    id integer NOT NULL,
    entity_id integer NOT NULL,
    url_img text NOT NULL,
    alt_text text,
    entity_type character varying(50) NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    deleted_at timestamp without time zone,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.image OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 16543)
-- Name: image_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.image_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.image_id_seq OWNER TO postgres;

--
-- TOC entry 4888 (class 0 OID 0)
-- Dependencies: 223
-- Name: image_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.image_id_seq OWNED BY public.image.id;


--
-- TOC entry 234 (class 1259 OID 16616)
-- Name: image_id_seq1; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.image ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.image_id_seq1
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 230 (class 1259 OID 16594)
-- Name: messages; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.messages (
    id integer NOT NULL,
    conversation_id integer,
    sender_id integer,
    message text NOT NULL,
    sent_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.messages OWNER TO postgres;

--
-- TOC entry 229 (class 1259 OID 16593)
-- Name: messages_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.messages_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.messages_id_seq OWNER TO postgres;

--
-- TOC entry 4889 (class 0 OID 0)
-- Dependencies: 229
-- Name: messages_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.messages_id_seq OWNED BY public.messages.id;


--
-- TOC entry 237 (class 1259 OID 16619)
-- Name: messages_id_seq1; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.messages ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.messages_id_seq1
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 226 (class 1259 OID 16555)
-- Name: saved_ads; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.saved_ads (
    id integer NOT NULL,
    id_user integer,
    ad_id integer,
    saved_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.saved_ads OWNER TO postgres;

--
-- TOC entry 225 (class 1259 OID 16554)
-- Name: saved_ads_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.saved_ads_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.saved_ads_id_seq OWNER TO postgres;

--
-- TOC entry 4890 (class 0 OID 0)
-- Dependencies: 225
-- Name: saved_ads_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.saved_ads_id_seq OWNED BY public.saved_ads.id;


--
-- TOC entry 235 (class 1259 OID 16617)
-- Name: saved_ads_id_seq1; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.saved_ads ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.saved_ads_id_seq1
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 218 (class 1259 OID 16501)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id_user integer NOT NULL,
    first_name character varying(100) NOT NULL,
    last_name character varying(100) NOT NULL,
    mail character varying(100) NOT NULL,
    password character varying(255) NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 16500)
-- Name: users_id_user_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_user_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_user_seq OWNER TO postgres;

--
-- TOC entry 4891 (class 0 OID 0)
-- Dependencies: 217
-- Name: users_id_user_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_user_seq OWNED BY public.users.id_user;


--
-- TOC entry 232 (class 1259 OID 16614)
-- Name: users_id_user_seq1; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.users ALTER COLUMN id_user ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.users_id_user_seq1
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 4863 (class 0 OID 16521)
-- Dependencies: 222
-- Data for Name: ads; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.ads (id, title, description, price, is_active, is_featured, id_user, id_category, created_at, deleted_at, updated_at) FROM stdin;
6	BicicletaAmarrilla nueva	Casi nueva	400	t	t	3	1	2025-04-13 21:32:26.367975	2025-06-09 15:54:50.541636	2025-04-14 14:03:16.548968
25	Almohada Capybara	hermsas almohada con diseño de animal en tendencias	50	t	f	15	4	2025-06-17 23:49:34.041001	\N	2025-06-18 07:28:29.225195
7	Laptop Hp	De caja	1300	t	t	3	2	2025-04-16 15:51:21.801101	2025-06-09 17:03:23.697727	2025-06-09 16:03:19.562199
11	Bicicleta de ocacionaaaaaa	Semi nueva	580	t	t	17	1	2025-06-09 07:37:18.786294	2025-06-09 17:03:32.166077	2025-06-09 07:37:18.786294
8	Mitsubishi	De medio uso, pero de mejor acompañia	59000	t	t	17	3	2025-05-10 12:18:43.784003	2025-06-09 17:03:36.44986	2025-06-09 16:02:06.671443
9	Armario Portatil	de facil armado y uso	200	t	t	17	4	2025-05-10 12:20:14.647058	2025-06-09 17:03:42.717376	2025-05-10 12:20:14.647058
10	Adidas Samba	Nuevo, en caja, mas info al numero 77788899	580	t	t	17	5	2025-05-10 12:21:59.726283	2025-06-09 17:03:47.521087	2025-06-09 16:00:53.21107
12	Bicicleta de ocacionaaaaaa	Semi nueva	580	t	t	17	1	2025-06-09 15:28:33.490761	2025-06-09 17:03:52.726942	2025-06-09 15:28:33.490761
13	Bicicleta de ocacion	Semi nueva	580	t	t	17	1	2025-06-09 17:05:33.261668	2025-06-09 17:16:51.840274	2025-06-09 17:05:33.261668
14	Bicicleta	Semi nueva, trato directo y rapido	580	t	t	17	1	2025-06-09 17:17:46.161206	\N	2025-06-09 17:17:46.161206
36	Sofa 	mejor calidad de descanso para tus dias libres	300	t	t	24	4	2025-06-23 18:55:57.861195	\N	2025-06-23 18:55:57.861195
37	Sofa 2	mejor calidad de descanso para tus dias libres	300	t	t	18	4	2025-06-23 19:21:44.515716	\N	2025-06-23 19:21:44.515716
38	Adidas Campus	tenis totalmente brasileros, campus tu mejor opcion	200	t	f	18	5	2025-07-01 03:56:27.885534	\N	2025-07-01 03:56:27.885534
19	Sabanas	ropa de cama, alta calidad de tela	180	t	t	18	4	2025-06-13 16:10:50.107782	2025-06-15 16:15:48.028286	2025-06-13 16:10:50.107782
16	Laptop Hp	laptop de medio uso, funcional para gamer	1300	t	t	17	2	2025-06-09 17:19:56.473314	\N	2025-06-15 17:26:26.819481
21	Fundas de Laptop	variedad de  fundas , diversos colores	90	t	t	18	2	2025-06-15 17:26:00.73338	\N	2025-06-15 17:27:40.426718
22	Teclado Mecanico	Nueva experiencia para teclear con ests teclados mecanicos, nuevo, de caja!!!!!	120	t	t	18	2	2025-06-15 18:40:35.011592	\N	2025-06-15 18:40:35.011592
23	Quit Gamer completo	Experiencia neta del gamer con estos equipos de alta calidad.COMPLETO!!	3900	t	t	18	2	2025-06-15 18:49:21.207385	\N	2025-06-15 18:49:21.207385
26	Suzuki Jimny amarillo	nuevo, con 5 años de garantia, pagos en cuotas o al contado. Llama ya o enviame un sms !	50000	t	f	15	3	2025-06-18 07:44:43.778263	\N	2025-06-18 17:26:31.827762
15	Adidas	tenis adidas sambas, nuevos de caja	380	t	t	17	5	2025-06-09 17:19:03.71745	\N	2025-07-01 04:09:36.362232
17	armario	facil armado, flexible	100	t	t	15	4	2025-06-09 17:22:39.909942	\N	2025-06-17 21:42:43.705061
39	Pantuflas	pantuflas bnitas	50	f	f	17	5	2025-07-03 08:50:44.52443	\N	2025-07-03 08:51:22.332895
27	Iphone 13 PRO	color blue, is tendencia baratito	25000	t	f	15	2	2025-06-18 20:27:06.854982	\N	2025-06-18 20:29:53.252116
20	Sabanas	ropa de cama, alta calidad de tela	180	t	t	18	4	2025-06-15 17:20:15.181184	2025-06-20 19:13:46.675794	2025-06-15 17:20:15.181184
24	Mouse Ligitech Negro on fire	La mejor calidad de Mouse con estos equipos	250	t	t	18	2	2025-06-15 18:53:19.789604	\N	2025-06-21 21:32:31.61527
28	pc ultimate generation	ultimate generation pc gamer, on fire actualli	2500	t	f	18	2	2025-06-21 21:37:21.297084	\N	2025-06-21 21:37:21.297084
18	Mitsubishi Black	medio uso, en buen estado, ideal para tu futura familia	14000	t	t	15	3	2025-06-09 17:23:50.802568	\N	2025-06-21 21:41:12.361179
\.


--
-- TOC entry 4861 (class 0 OID 16512)
-- Dependencies: 220
-- Data for Name: category; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.category (id, name, description) FROM stdin;
1	Bicicletas	Todo tipo de bicicletas: urbanas, de montaña, BMX y más
2	Electroniaca	Toda variedad de equipos electronicos
3	Vehiculos	Cualquier modelo y en cualquier estado
4	Hogar	Productos para el hogar
5	Moda	Productos para vestir facherit@
\.


--
-- TOC entry 4869 (class 0 OID 16572)
-- Dependencies: 228
-- Data for Name: conversations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.conversations (id, ad_id, sender_id, receiver_id) FROM stdin;
1	6	10	3
2	23	15	18
3	25	18	15
4	15	18	17
5	24	15	18
6	15	15	17
7	22	20	18
8	25	24	15
9	37	24	18
10	36	18	24
\.


--
-- TOC entry 4865 (class 0 OID 16544)
-- Dependencies: 224
-- Data for Name: image; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.image (id, entity_id, url_img, alt_text, entity_type, created_at, deleted_at, updated_at) FROM stdin;
57	37	1750720904361-sofa-azul.png	\N	ad	2025-06-23 19:21:44.533866	\N	2025-06-23 19:21:44.533866
58	38	1751356587667-campus-azules.png	\N	ad	2025-07-01 03:56:27.904756	\N	2025-07-01 03:56:27.904756
59	38	1751356587673-campus-negros.png	\N	ad	2025-07-01 03:56:27.904756	\N	2025-07-01 03:56:27.904756
60	38	1751356587674-campus-plomo.png	\N	ad	2025-07-01 03:56:27.904756	\N	2025-07-01 03:56:27.904756
61	15	1751357376260-samba-black.png	\N	ad	2025-07-01 04:09:36.412475	\N	2025-07-01 04:09:36.412475
3	6	1744594346233-bicicleta.png	\N	ad	2025-04-13 21:32:26.391045	2025-06-09 15:54:50.552668	2025-04-13 21:32:26.391045
4	6	1744594346234-cleta2.png	\N	ad	2025-04-13 21:32:26.391045	2025-06-09 15:54:50.552668	2025-04-13 21:32:26.391045
5	6	1744653272687-oro29.png	\N	ad	2025-04-14 13:54:32.86119	2025-06-09 15:54:50.552668	2025-04-14 13:54:32.86119
6	6	1744653272690-IG-amarillo.png	\N	ad	2025-04-14 13:54:32.86119	2025-06-09 15:54:50.552668	2025-04-14 13:54:32.86119
7	6	1744653796347-igm-aluminio6.png	\N	ad	2025-04-14 14:03:16.56622	2025-06-09 15:54:50.552668	2025-04-14 14:03:16.56622
15	6	1749499003655-1744653272690-IG-amarillo.png	\N	ad	2025-06-09 15:56:43.807777	\N	2025-06-09 15:56:43.807777
16	6	1749499103579-adidas-samba.png	\N	ad	2025-06-09 15:58:23.688265	\N	2025-06-09 15:58:23.688265
8	7	1744833081606-Hp.png	\N	ad	2025-04-16 15:51:21.827579	2025-06-09 17:03:23.704961	2025-04-16 15:51:21.827579
9	7	1744833081629-hp2.png	\N	ad	2025-04-16 15:51:21.827579	2025-06-09 17:03:23.704961	2025-04-16 15:51:21.827579
19	7	1749499336707-1746893923611-Mitsubishi.png	\N	ad	2025-06-09 16:02:16.747682	2025-06-09 17:03:23.704961	2025-06-09 16:02:16.747682
20	7	1749499399379-Hp.png	\N	ad	2025-06-09 16:03:19.805249	2025-06-09 17:03:23.704961	2025-06-09 16:03:19.805249
21	7	1749499399380-hp2.png	\N	ad	2025-06-09 16:03:19.805249	2025-06-09 17:03:23.704961	2025-06-09 16:03:19.805249
13	11	1749469038605-bici-celeste.png	\N	ad	2025-06-09 07:37:18.810542	2025-06-09 17:03:32.168583	2025-06-09 07:37:18.810542
10	8	1746893923611-Mitsubishi.png	\N	ad	2025-05-10 12:18:43.819451	2025-06-09 17:03:36.453061	2025-05-10 12:18:43.819451
18	8	1749499326532-1746893923611-Mitsubishi.png	\N	ad	2025-06-09 16:02:06.847559	2025-06-09 17:03:36.453061	2025-06-09 16:02:06.847559
11	9	1746894014499-armario-poratil.png	\N	ad	2025-05-10 12:20:14.662014	2025-06-09 17:03:42.719782	2025-05-10 12:20:14.662014
12	10	1746894119479-adidas-samba.png	\N	ad	2025-05-10 12:21:59.744239	2025-06-09 17:03:47.526194	2025-05-10 12:21:59.744239
17	10	1749499253098-adidas-samba.png	\N	ad	2025-06-09 16:00:53.218327	2025-06-09 17:03:47.526194	2025-06-09 16:00:53.218327
14	12	1749497313355-bici-celeste.png	\N	ad	2025-06-09 15:28:33.505757	2025-06-09 17:03:52.728782	2025-06-09 15:28:33.505757
22	13	1749503133145-bici-celeste.png	\N	ad	2025-06-09 17:05:33.271409	2025-06-09 17:16:51.846914	2025-06-09 17:05:33.271409
23	14	1749503866033-bici-celeste.png	\N	ad	2025-06-09 17:17:46.179027	\N	2025-06-09 17:17:46.179027
24	15	1749503943615-1746894119479-adidas-samba.png	\N	ad	2025-06-09 17:19:03.72818	\N	2025-06-09 17:19:03.72818
25	16	1749503996374-Hp.png	\N	ad	2025-06-09 17:19:56.483846	\N	2025-06-09 17:19:56.483846
26	17	1749504159806-1746894014499-armario-poratil.png	\N	ad	2025-06-09 17:22:39.920366	\N	2025-06-09 17:22:39.920366
27	18	1749504230364-1746893923611-Mitsubishi.png	\N	ad	2025-06-09 17:23:50.818622	\N	2025-06-09 17:23:50.818622
28	16	1749513323886-Hp.png	\N	ad	2025-06-09 19:55:24.109547	\N	2025-06-09 19:55:24.109547
29	16	1749513323892-hp2.png	\N	ad	2025-06-09 19:55:24.109547	\N	2025-06-09 19:55:24.109547
30	19	1749845450002-sabanas.png	\N	ad	2025-06-13 16:10:50.121289	2025-06-15 16:15:48.033583	2025-06-13 16:10:50.121289
32	21	1750022760632-fundas.png	\N	ad	2025-06-15 17:26:00.744124	\N	2025-06-15 17:26:00.744124
33	16	1750022786688-Hp.png	\N	ad	2025-06-15 17:26:26.828042	\N	2025-06-15 17:26:26.828042
34	16	1750022786689-hp2.png	\N	ad	2025-06-15 17:26:26.828042	\N	2025-06-15 17:26:26.828042
35	21	1750022860289-funda-rosada.png	\N	ad	2025-06-15 17:27:40.434783	\N	2025-06-15 17:27:40.434783
36	21	1750022860290-funda-negra.png	\N	ad	2025-06-15 17:27:40.434783	\N	2025-06-15 17:27:40.434783
37	21	1750022860291-funda-plomo.png	\N	ad	2025-06-15 17:27:40.434783	\N	2025-06-15 17:27:40.434783
38	22	1750027234883-mecanico-2.png	\N	ad	2025-06-15 18:40:35.021871	\N	2025-06-15 18:40:35.021871
39	22	1750027234888-teclado-mecanico.png	\N	ad	2025-06-15 18:40:35.021871	\N	2025-06-15 18:40:35.021871
40	23	1750027761075-gamer-2.png	\N	ad	2025-06-15 18:49:21.218434	\N	2025-06-15 18:49:21.218434
41	23	1750027761078-quit-gamer.png	\N	ad	2025-06-15 18:49:21.218434	\N	2025-06-15 18:49:21.218434
42	24	1750027999658-logitech-3.png	\N	ad	2025-06-15 18:53:19.801068	\N	2025-06-15 18:53:19.801068
43	24	1750027999659-logitech-2.png	\N	ad	2025-06-15 18:53:19.801068	\N	2025-06-15 18:53:19.801068
44	24	1750027999659-mouser-logitech.png	\N	ad	2025-06-15 18:53:19.801068	\N	2025-06-15 18:53:19.801068
45	25	1750218573274-Almohada.png	\N	ad	2025-06-17 23:49:34.077457	\N	2025-06-17 23:49:34.077457
46	26	1750247083541-suzuki-3.png	\N	ad	2025-06-18 07:44:43.952044	\N	2025-06-18 07:44:43.952044
47	26	1750247083543-suzuki-w.png	\N	ad	2025-06-18 07:44:43.952044	\N	2025-06-18 07:44:43.952044
48	26	1750247083573-jimny-suzuki.png	\N	ad	2025-06-18 07:44:43.952044	\N	2025-06-18 07:44:43.952044
49	27	1750292826752-iphone 13.png	\N	ad	2025-06-18 20:27:06.866414	\N	2025-06-18 20:27:06.866414
31	20	1750022415064-sabanas.png	\N	ad	2025-06-15 17:20:15.192229	2025-06-20 19:13:46.728811	2025-06-15 17:20:15.192229
50	28	1750556240489-pc-13.png	\N	ad	2025-06-21 21:37:21.48797	\N	2025-06-21 21:37:21.48797
56	36	1750719357747-sofa-azul.png	\N	ad	2025-06-23 18:55:57.874978	\N	2025-06-23 18:55:57.874978
62	15	1751357376265-sneacker.png	\N	ad	2025-07-01 04:09:36.412475	\N	2025-07-01 04:09:36.412475
63	39	1751547044155-pant.png	\N	ad	2025-07-03 08:50:44.561559	\N	2025-07-03 08:50:44.561559
\.


--
-- TOC entry 4871 (class 0 OID 16594)
-- Dependencies: 230
-- Data for Name: messages; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.messages (id, conversation_id, sender_id, message, sent_at) FROM stdin;
3	1	10	Hola, ¿aún lo tenés disponible?	2025-04-17 15:10:00.959464
4	1	10	Hola, ¿aún lo tenés disponible?	2025-04-17 15:10:33.950471
5	2	15	hola	2025-06-18 17:44:07.317751
6	3	18	hola, sigue disponible?	2025-06-18 17:53:40.829735
7	3	18	pleasee	2025-06-18 17:53:46.97276
8	3	18	prueba	2025-06-18 18:20:10.718816
9	2	15	hola, siugue disponible el mouse	2025-06-19 11:35:04.968318
10	3	18	hola, siugue disponible el mouse	2025-06-19 12:36:04.270194
11	3	18	hola Vania	2025-06-19 18:40:22.814737
12	4	18	Hola Ana	2025-06-19 18:40:42.733722
13	4	18	sigue disponible tu anuanico?	2025-06-19 18:40:53.273287
14	5	15	Hola Erick, soy Vnia , sigue disponible??	2025-06-19 22:01:35.489191
15	3	15	holi	2025-06-19 22:49:32.286726
44	4	18	Hola, ¿aún lo tenés disponible?	2025-06-23 16:28:17.387026
45	8	18	Hola, ¿aún lo tenés disponible e sofa?	2025-06-23 18:59:33.03309
46	8	24	Hola, ¿aún lo tenés disponible e sofa?	2025-06-23 18:59:51.595465
47	8	24	Hola, ¿aún lo tenés disponible e sofa?	2025-06-23 18:59:56.924999
48	3	24	Hola, ¿esto es una prueba del producto sofa?	2025-06-23 19:09:57.504131
49	9	24	Hola, ¿esto es una prueba del producto sofa2?	2025-06-23 19:24:15.091693
50	5	18	hola	2025-07-01 03:20:40.794249
51	5	18	es una prueba	2025-07-01 03:20:44.845358
52	5	18	s	2025-07-01 03:20:45.986302
53	5	18	s	2025-07-01 03:20:46.874079
54	5	18	s	2025-07-01 03:20:47.130531
55	5	18	s	2025-07-01 03:20:47.381096
56	5	18	s	2025-07-01 03:20:47.667399
57	5	18	s	2025-07-01 03:20:47.885699
58	5	18	s	2025-07-01 03:20:48.101012
59	5	18	s	2025-07-01 03:20:48.337907
60	3	18	dsfsfasd	2025-07-01 03:22:42.970226
61	3	18	asdas	2025-07-01 03:22:43.569209
62	3	18	dasd	2025-07-01 03:22:43.860032
63	3	18	asdasd	2025-07-01 03:22:44.286058
64	3	18	asd	2025-07-01 03:22:44.499269
65	3	18	asd	2025-07-01 03:22:44.709344
66	3	18	as	2025-07-01 03:22:44.881339
67	3	18	das	2025-07-01 03:22:45.071293
68	3	18	das	2025-07-01 03:22:45.270465
69	3	18	da	2025-07-01 03:22:45.478936
70	3	18	d	2025-07-01 03:22:45.651067
71	3	18	asd	2025-07-01 03:22:45.87567
72	3	18	as	2025-07-01 03:22:46.047959
73	3	18	as	2025-07-01 03:22:46.21956
74	3	18	d	2025-07-01 03:22:46.351631
75	3	18	das	2025-07-01 03:22:46.738254
76	3	18	dasdas	2025-07-01 03:22:47.474059
77	3	18	asdasdasd	2025-07-01 03:23:03.919608
78	10	18	Hola fede, sigue disponible?	2025-07-03 06:53:36.523821
79	4	17	sippp	2025-07-03 08:46:55.827191
\.


--
-- TOC entry 4867 (class 0 OID 16555)
-- Dependencies: 226
-- Data for Name: saved_ads; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.saved_ads (id, id_user, ad_id, saved_at) FROM stdin;
11	15	14	2025-06-13 15:44:45.116079
25	15	20	2025-06-16 19:43:01.957261
26	20	22	2025-06-20 19:11:08.728729
28	18	36	2025-07-03 06:52:31.691923
\.


--
-- TOC entry 4859 (class 0 OID 16501)
-- Dependencies: 218
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id_user, first_name, last_name, mail, password) FROM stdin;
1	Juan	Pérez	juan@example.com	$2b$10$IMWKfIHO5lc2GL38r7tCK.sF0fPniCFZLvH1OUigXPdmB5INcGxOO
3	Ronal	Soliz	rsoliz@gmail.com	$2b$10$7W1O7rF.KKN7kXcYu4DtYusbJfteLcgY9/2Ltt7VqBS4PubcFF2A2
4	Leonardo	Soliz	leo@gmail.com	$2b$10$.Be5rPvFh4RcjRtLLrbopeGMx8..sxSvaeE2ExLFnIOW1kjbgFrK2
7	Leonardo	Soliz	leonardo@gmail.com	$2b$10$nD.rYyhKjn8GnJ/Kmu04/u6.7BD1Z8pWcxARhzNpJut.Npw3A3tU6
8	Leonardo	Soliz	manolo@gmail.com	$2b$10$fgkv/96.yM8rsnNDDFlLk.vWZj8OApK1WrFLtTa0gmXkTBf.JhDku
9	Manolo	Mano	manolito@gmail.com	$2b$10$KF/t.ySilWIOni9520EAwO6urxKvTyt97/mvJXBjv0gdl6/8rmdwa
10	Pepe	Mendoza	pepito@mendoza.com	$2b$10$mDmS80hwBGQlEZmKhBfn6eihN0y7vtaKUmkQj3BH0RPkcZ4OyxsOG
11	Leo Ronaldo	maldonado	maldonado@gmail.com	$2b$10$m7Kthp0d5PKmwPQjOpQ.5O6VwrydrZUxufguLhGhREw033.RooaDe
12	carol	tv	carola@gmail.com	$2b$10$BYaSPvrFGhronjGh7WJKa.8uygOcUsr0DI2k.uHFyKJ.SBjOsSPXK
13	carol	tvxc	carola2@gmail.com	$2b$10$RxLtVLNUqrTIpAj4YJOlh.l0kQvkS8.j4twGhDDLGfRyeZtR2yO6G
14	carol	tvxcs	carola22@gmail.com	$2b$10$2UunLBxJk./Iu5F/PhoH.ePYB2bUtY5Axd8BxdcA/TZ/qNvaISX2S
15	vania	spolls	vania@gmail.com	443322
16	mario	pedraza	mari@gmail.com	443355
17	Anabely	Chicaba	ana@gmail.com	112233
18	Erick	Fernandez	erick@gmail.com	123456
20	Valencia	Calcina	valencia@gmail.com	102030
24	Federico	Pereira	federico@gmail.com	101020
\.


--
-- TOC entry 4892 (class 0 OID 0)
-- Dependencies: 221
-- Name: ads_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.ads_id_seq', 1, false);


--
-- TOC entry 4893 (class 0 OID 0)
-- Dependencies: 231
-- Name: ads_id_seq1; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.ads_id_seq1', 39, true);


--
-- TOC entry 4894 (class 0 OID 0)
-- Dependencies: 219
-- Name: category_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.category_id_seq', 1, false);


--
-- TOC entry 4895 (class 0 OID 0)
-- Dependencies: 233
-- Name: category_id_seq1; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.category_id_seq1', 5, true);


--
-- TOC entry 4896 (class 0 OID 0)
-- Dependencies: 227
-- Name: conversations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.conversations_id_seq', 1, false);


--
-- TOC entry 4897 (class 0 OID 0)
-- Dependencies: 236
-- Name: conversations_id_seq1; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.conversations_id_seq1', 10, true);


--
-- TOC entry 4898 (class 0 OID 0)
-- Dependencies: 223
-- Name: image_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.image_id_seq', 1, false);


--
-- TOC entry 4899 (class 0 OID 0)
-- Dependencies: 234
-- Name: image_id_seq1; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.image_id_seq1', 63, true);


--
-- TOC entry 4900 (class 0 OID 0)
-- Dependencies: 229
-- Name: messages_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.messages_id_seq', 1, false);


--
-- TOC entry 4901 (class 0 OID 0)
-- Dependencies: 237
-- Name: messages_id_seq1; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.messages_id_seq1', 79, true);


--
-- TOC entry 4902 (class 0 OID 0)
-- Dependencies: 225
-- Name: saved_ads_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.saved_ads_id_seq', 1, false);


--
-- TOC entry 4903 (class 0 OID 0)
-- Dependencies: 235
-- Name: saved_ads_id_seq1; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.saved_ads_id_seq1', 28, true);


--
-- TOC entry 4904 (class 0 OID 0)
-- Dependencies: 217
-- Name: users_id_user_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_user_seq', 1, false);


--
-- TOC entry 4905 (class 0 OID 0)
-- Dependencies: 232
-- Name: users_id_user_seq1; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_user_seq1', 24, true);


--
-- TOC entry 4694 (class 2606 OID 16532)
-- Name: ads ads_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ads
    ADD CONSTRAINT ads_pkey PRIMARY KEY (id);


--
-- TOC entry 4692 (class 2606 OID 16519)
-- Name: category category_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.category
    ADD CONSTRAINT category_pkey PRIMARY KEY (id);


--
-- TOC entry 4700 (class 2606 OID 16577)
-- Name: conversations conversations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.conversations
    ADD CONSTRAINT conversations_pkey PRIMARY KEY (id);


--
-- TOC entry 4696 (class 2606 OID 16553)
-- Name: image image_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.image
    ADD CONSTRAINT image_pkey PRIMARY KEY (id);


--
-- TOC entry 4702 (class 2606 OID 16602)
-- Name: messages messages_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.messages
    ADD CONSTRAINT messages_pkey PRIMARY KEY (id);


--
-- TOC entry 4698 (class 2606 OID 16560)
-- Name: saved_ads saved_ads_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.saved_ads
    ADD CONSTRAINT saved_ads_pkey PRIMARY KEY (id);


--
-- TOC entry 4688 (class 2606 OID 16510)
-- Name: users users_mail_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_mail_key UNIQUE (mail);


--
-- TOC entry 4690 (class 2606 OID 16508)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id_user);


--
-- TOC entry 4712 (class 2620 OID 24692)
-- Name: ads trg_delete_images_with_ad; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER trg_delete_images_with_ad AFTER DELETE ON public.ads FOR EACH ROW EXECUTE FUNCTION public.delete_ad_images();


--
-- TOC entry 4703 (class 2606 OID 16538)
-- Name: ads ads_id_category_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ads
    ADD CONSTRAINT ads_id_category_fkey FOREIGN KEY (id_category) REFERENCES public.category(id) ON DELETE SET NULL;


--
-- TOC entry 4704 (class 2606 OID 16533)
-- Name: ads ads_id_user_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ads
    ADD CONSTRAINT ads_id_user_fkey FOREIGN KEY (id_user) REFERENCES public.users(id_user) ON DELETE CASCADE;


--
-- TOC entry 4707 (class 2606 OID 16578)
-- Name: conversations conversations_ad_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.conversations
    ADD CONSTRAINT conversations_ad_id_fkey FOREIGN KEY (ad_id) REFERENCES public.ads(id) ON DELETE CASCADE;


--
-- TOC entry 4708 (class 2606 OID 16588)
-- Name: conversations conversations_receiver_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.conversations
    ADD CONSTRAINT conversations_receiver_id_fkey FOREIGN KEY (receiver_id) REFERENCES public.users(id_user);


--
-- TOC entry 4709 (class 2606 OID 16583)
-- Name: conversations conversations_sender_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.conversations
    ADD CONSTRAINT conversations_sender_id_fkey FOREIGN KEY (sender_id) REFERENCES public.users(id_user);


--
-- TOC entry 4710 (class 2606 OID 16603)
-- Name: messages messages_conversation_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.messages
    ADD CONSTRAINT messages_conversation_id_fkey FOREIGN KEY (conversation_id) REFERENCES public.conversations(id) ON DELETE CASCADE;


--
-- TOC entry 4711 (class 2606 OID 16608)
-- Name: messages messages_sender_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.messages
    ADD CONSTRAINT messages_sender_id_fkey FOREIGN KEY (sender_id) REFERENCES public.users(id_user);


--
-- TOC entry 4705 (class 2606 OID 16566)
-- Name: saved_ads saved_ads_ad_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.saved_ads
    ADD CONSTRAINT saved_ads_ad_id_fkey FOREIGN KEY (ad_id) REFERENCES public.ads(id) ON DELETE CASCADE;


--
-- TOC entry 4706 (class 2606 OID 16561)
-- Name: saved_ads saved_ads_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.saved_ads
    ADD CONSTRAINT saved_ads_user_id_fkey FOREIGN KEY (id_user) REFERENCES public.users(id_user) ON DELETE CASCADE;


-- Completed on 2025-07-03 09:35:21

--
-- PostgreSQL database dump complete
--

