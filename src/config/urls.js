// export const DOMAIN = "http://127.0.0.1:4000"
// export const PREFIX = DOMAIN + ""
// export const URLS = {
// 	REGISTER: PREFIX + "/annotator/register",
// 	LOGIN: PREFIX + "/annotator/enter",
// 	LOAD_DETECTION : PREFIX + "/sentence/fromDatabase/",
// 	UPLOAD_DETECTION : PREFIX + "/sentence/toDatabase",
// 	REMOVE_DETECTION : PREFIX + "/sentence/remove/",
// 	UPDATE_DETECTION : PREFIX + "/sentence/edit/",
// 	LOAD_DUMY_SENTENCES: PREFIX + "/sentence/loadDumySentences/",
// 	LOAD_SLOTS: PREFIX + "/sentence/getSlots",
// 	CHANGE_BOOLEAN: PREFIX + "/sentence/changeBoolean",
// 	COUNT_DATA: PREFIX + "/sentence/count/"
// }
export const API_URL = "https://intent-detection.onrender.com"
// export const API_URL = "http://localhost:400"

export const URLS = {
	REGISTER: API_URL + "/annotator/register",
	LOGIN: API_URL + "/annotator/enter",
	LOAD_DETECTION: API_URL + "/sentence/fromDatabase/",
	UPLOAD_DETECTION: API_URL + "/sentence/toDatabase",
	REMOVE_DETECTION: API_URL + "/sentence/remove/",
	UPDATE_DETECTION: API_URL + "/sentence/edit/",
	LOAD_DUMY_SENTENCES: API_URL + "/sentence/loadDumySentences/",
	LOAD_SLOTS: API_URL + "/sentence/getSlots",
	CHANGE_BOOLEAN: API_URL + "/sentence/changeBoolean",
	COUNT_DATA: API_URL+ "/sentence/count/",
	REDUNDENCY: API_URL+ "/admin/redundancy"
}
