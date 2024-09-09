//BD5.3 - HW3

const express = require("express");
const app = express();
const port = 3000;
app.use(express.json());
const { sequelize } = require("./lib/");
const { company } = require("./model/company.model.js");

const companies = [
  {
    id: 1,
    name: "Tech Innovators",
    industry: "Technology",
    foundedYear: 2010,
    headquarters: "San Francisco",
    revenue: 75000000,
  },
  {
    id: 2,
    name: "Green Earth",
    industry: "Renewable Energy",
    foundedYear: 2015,
    headquarters: "Portland",
    revenue: 50000000,
  },
  {
    id: 3,
    name: "Innovatech",
    industry: "Technology",
    foundedYear: 2012,
    headquarters: "Los Angeles",
    revenue: 65000000,
  },
  {
    id: 4,
    name: "Solar Solutions",
    industry: "Renewable Energy",
    foundedYear: 2015,
    headquarters: "Austin",
    revenue: 60000000,
  },
  {
    id: 5,
    name: "HealthFirst",
    industry: "Healthcare",
    foundedYear: 2008,
    headquarters: "New York",
    revenue: 80000000,
  },
  {
    id: 6,
    name: "EcoPower",
    industry: "Renewable Energy",
    foundedYear: 2018,
    headquarters: "Seattle",
    revenue: 55000000,
  },
  {
    id: 7,
    name: "MediCare",
    industry: "Healthcare",
    foundedYear: 2012,
    headquarters: "Boston",
    revenue: 70000000,
  },
  {
    id: 8,
    name: "NextGen Tech",
    industry: "Technology",
    foundedYear: 2018,
    headquarters: "Chicago",
    revenue: 72000000,
  },
  {
    id: 9,
    name: "LifeWell",
    industry: "Healthcare",
    foundedYear: 2010,
    headquarters: "Houston",
    revenue: 75000000,
  },
  {
    id: 10,
    name: "CleanTech",
    industry: "Renewable Energy",
    foundedYear: 2008,
    headquarters: "Denver",
    revenue: 62000000,
  },
];

app.get("/seed_db", async (req, res) => {
  try {
    await sequelize.sync({ force: true });
    await company.bulkCreate(companies);
    res.status(200).json({ message: "DataBase Seeding Successful" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "DataBase Seeding Error", error: error.message });
  }
});

//Exercise 1: Fetch all companies

async function fetchAllCompanies() {
  let response = await company.findAll();
  return { companies: response };
}

app.get("/companies", async (req, res) => {
  try {
    let result = await fetchAllCompanies();

    if (result.companies.length === 0) {
      res.status(404).json({ message: "No companies available" });
    }

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//Exercise 2: Add a new company in the database

async function addNewCompany(newCompany) {
  let response = await company.create(newCompany);
  return { newCompany: response };
}

app.post("/companies/new", async (req, res) => {
  try {
    let newCompany = req.body.newCompany;
    let result = await addNewCompany(newCompany);
    return res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//Exercise 3: Update companies information

async function updateCompanyById(id, newCompanyData) {
  let response = await company.findOne({ where: { id } });

  if(!response) return {};

  response.set(newCompanyData);
  let updatedCompany = await response.save();
  return { message: "Company Updated Successfully ",updatedCompany };
}

app.post("/companies/update/:id", async (req, res) => {
  try {
    let newCompanyData = req.body;
    let result = await updateCompanyById(req.params.id, newCompanyData);

    if(!result.updatedCompany) {
      res.status(404).json({ message: "No company available" });
    }

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
})

async function deleteCompanyById(id) {
  let response = await company.destroy({ where: { id } });

  if(response === 0) return {};

  return { 'message' :'Company record deleted successfully' };
}

app.post("/companies/delete", async (req, res) => {
  try {
    let id = req.body.id;
    let result = await deleteCompanyById(id);

    if(!result.message) {
      res.status(404).json({ message: "No company available to delete" });
    }

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
