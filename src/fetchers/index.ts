import { http } from "./http";

const getInformation = async () => {
  let res = await http.get(`/information.json`);
  return res.data;
};

const getServices = async () => {
  let res = await http.get(`/services.json`);
  return res.data;
};

const getTechSkills = async () => {
  let res = await http.get(`/techskills.json`);
  return res.data;
};

const getLanguageSkills = async () => {
  let res = await http.get(`/languageskills.json`);
  return res.data;
};

const getPortfolioFilters = async () => {
  let res = await http.get(`/portfoliofilters.json`);
  return res.data;
};

const getPortfolios = async () => {
  let res = await http.get(`/portfolios.json`);
  return res.data;
};

const getJobExperience = async () => {
  let res = await http.get(`/jobexperience.json`);
  return res.data;
};

const getEducationBackground = async () => {
  let res = await http.get(`/educationbackground.json`);
  return res.data;
};

const getClientReviews = async () => {
  let res = await http.get(`/clientsreview.json`);
  return res.data;
};

export {
  getInformation,
  getServices,
  getTechSkills,
  getLanguageSkills,
  getPortfolioFilters,
  getPortfolios,
  getJobExperience,
  getEducationBackground,
  getClientReviews,
};
