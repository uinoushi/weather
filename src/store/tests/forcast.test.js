import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { fetchWeather } from "../forecast";
import configureStore from "../configureStore";

describe("forecastSlice", () => {
  let fakeAxios;
  let store;

  beforeEach(() => {
    fakeAxios = new MockAdapter(axios);
    store = configureStore();
  });

  const forecastSlice = () => store.getState().forecast;

  const position = {
    coords: {
      latitude: 32,
      longitude: 32,
    },
  };

  describe("loading forecast", () => {
    describe("if the forecast don't exist in the cache", () => {
      describe("loading indicator", () => {
        it("should be true while fetching the forecast", () => {
          fakeAxios.onGet("/forecast").reply(() => {
            expect(forecastSlice().loading).toBe(true);
            return [200, [{ id: 1 }]];
          });

          store.dispatch(fetchWeather(position));
        });

        it("should be false after the forecast are fetched", async () => {
          fakeAxios.onGet("/forecast").reply(200, [{ id: 1 }]);

          await store.dispatch(fetchWeather(position));

          expect(forecastSlice().loading).toBe(false);
        });

        it("should be false if the server returns an error", async () => {
          fakeAxios.onGet("/forecast").reply(500);

          await store.dispatch(fetchWeather(position));

          expect(forecastSlice().loading).toBe(false);
        });
      });
    });
  });
});
