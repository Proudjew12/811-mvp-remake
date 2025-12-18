export const adminDashboardHeaderService = {
  getModel,
};

type AdminHeaderModel = {
  userName: string;
};

const model: AdminHeaderModel = {
  userName: "צבי אלדר",
};

function getModel(): AdminHeaderModel {
  return model;
}
