class OwnerService {
  async register(inputs) {
    try {
      const res = await fetch("/api/v1/owners/register", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...inputs,
          role: "owner",
          redirectURL: `${import.meta.env.VITE_FRONTEND_BASE_URL}/user/verify`,
        }),
      });

      let data = await res.json();
      console.log(data);

      if (res.status === 500) {
        throw new Error(data.message);
      }
      return data;
    } catch (err) {
      console.error(`error in register service: ${err.message}`);
      throw err;
    }
  }

  async update(updates) {
    try {
      const res = await fetch("/api/v1/owners/update", {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ updates }),
      });

      let data = await res.json();
      console.log(data);

      if (res.status === 500) {
        throw new Error(data.message);
      }
      return data;
    } catch (err) {
      console.error(`error in update service: ${err.message}`);
      throw err;
    }
  }

  async getStartupOwner(ownerId) {
    try {
      const res = await fetch(`/api/v1/owners/${ownerId}`, {
        method: "GET",
        credentials: "include",
      });

      const data = await res.json();
      console.log(data);

      if (res.status === 500) {
        throw new Error(data.message);
      }
      return data;
    } catch (err) {
      console.error(`error in getStartupOwner service: ${err.message}`);
      throw err;
    }
  }
}

export const ownerService = new OwnerService();
