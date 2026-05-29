import "./catalog.css";
import { useState, useEffect, useMemo } from "react";
import "../../style.css";
import {
  Collapse,
  Checkbox,
  Button,
  Breadcrumb,
  message,
  Empty,
  Select,
} from "antd";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import axios from "axios";
import {
  getAuthToken,
  getAuthHeaders,
  getProductImageUrl,
  addToCart,
  formatProductTitle,
  getTypeAlcoholLabel,
  formatVolume,
  formatDurability,
} from "../../utils/helpers";

const { Panel } = Collapse;

function Catalog() {
  const [selectedType, setSelectedType] = useState({});
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const type = searchParams.get("type");
  const brand = searchParams.get("brand");
  const token = getAuthToken();
  const [user, setUser] = useState(null);
  const [data, setData] = useState([]);
  const [selectedVolume, setSelectedVolume] = useState({});
  const [selectedCountry, setSelectedCountry] = useState({});
  const [selectedStrength, setSelectedStrength] = useState({});
  const [sortBy, setSortBy] = useState("default");
  const [popularityMap, setPopularityMap] = useState({});

  useEffect(() => {
    const loadPopularity = async () => {
      try {
        const response = await axios.get("/order-items");
        const map = {};
        (response.data || []).forEach((line) => {
          const alcoholId = line.alcohol?.id;
          if (alcoholId) {
            map[alcoholId] = (map[alcoholId] || 0) + Number(line.quantity || 1);
          }
        });
        setPopularityMap(map);
      } catch {
        setPopularityMap({});
      }
    };
    loadPopularity();
  }, []);

  const sortedData = useMemo(() => {
    const list = [...data];
    switch (sortBy) {
      case "price_asc":
        return list.sort((a, b) => Number(a.cost) - Number(b.cost));
      case "price_desc":
        return list.sort((a, b) => Number(b.cost) - Number(a.cost));
      case "popular":
        return list.sort(
          (a, b) =>
            (popularityMap[b.id] || 0) - (popularityMap[a.id] || 0) ||
            a.brand.localeCompare(b.brand, "uk")
        );
      default:
        return list;
    }
  }, [data, sortBy, popularityMap]);

  useEffect(() => {
    if (!token) return;
    const fetchUser = async () => {
      try {
        const headers = getAuthHeaders();
        const responseMe = await axios.get("/auth/me", { headers });
        const response = await axios.get(`/users/${responseMe.data.userId}`, {
          headers,
        });
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchUser();
  }, [token]);

  useEffect(() => {
    if (type) {
      setSelectedType({ [type]: true });
    }
  }, [type]);

  useEffect(() => {
    const fetchData = async () => {
      const params = new URLSearchParams();

      if (type) {
        params.append("type_alcohol", type);
      }
      if (brand) {
        params.append("brand", brand);
      }
      if (selectedCountry) {
        Object.entries(selectedCountry).forEach(([key, value]) => {
          if (value) params.append("countries", key);
        });
      }

      if (selectedType) {
        Object.entries(selectedType).forEach(([key, value]) => {
          if (value) params.append("type_alcohol", key);
        });
      }

      if (selectedVolume) {
        Object.entries(selectedVolume).forEach(([key, value]) => {
          if (value) params.append("volume", key);
        });
      }

      if (selectedStrength) {
        Object.entries(selectedStrength).forEach(([key, value]) => {
          if (value) params.append("durability", key);
        });
      }

      try {
        const response = await axios.get(
          `/alcohol/filter?${params.toString()}`
        );
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [
    selectedCountry,
    selectedType,
    selectedVolume,
    selectedStrength,
    type,
    brand,
  ]);

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`/alcohol/${id}`);
      window.location.reload();
    } catch (error) {
      alert("Помилка видалення!");
    }
  };

  const alcohols = [
    { label: "Віскі", value: "Whiskey" },
    { label: "Бренді", value: "Brandy" },
    { label: "Горілка", value: "Vodka" },
    { label: "Ром", value: "Rum" },
    { label: "Текіла", value: "Tequila" },
    { label: "Вино", value: "Wines" },
    { label: "Джин", value: "Gin" },
    { label: "Лікер", value: "Liquor" },
    { label: "Пиво", value: "Beer" },
  ];
  const options = [
    { label: "0,5", value: "0.5" },
    { label: "0,7", value: "0.7" },
    { label: "0,75", value: "0.75" },
    { label: "0,9", value: "0.9" },
    { label: "1", value: "1" },
    { label: "1,5", value: "1.5" },
    { label: "1,75", value: "1.75" },
    { label: "2", value: "2" },
    { label: "3", value: "3" },
    { label: "4,5", value: "4.5" },
  ];
  const country = [
    { label: "Україна", value: "Ukraine" },
    { label: "США", value: "United States" },
    { label: "Канада", value: "Canada" },
    { label: "Німеччина", value: "Germany" },
    { label: "Франція", value: "France" },
    { label: "Іспанія", value: "Spain" },
    { label: "Італія", value: "Italy" },
    { label: "Польща", value: "Poland" },
    { label: "Японія", value: "Japan" },
    { label: "Австралія", value: "Australia" },
  ];
  const strength = [
    { label: "Безалкогольний (0%)", value: "0" },
    { label: "Легкий (5%)", value: "5" },
    { label: "Середній (10%)", value: "10" },
    { label: "Міцний (20%)", value: "20" },
    { label: "Дуже міцний (40%)", value: "40" },
    { label: "Екстремальний (50%)", value: "50" },
  ];

  const handleTypeChange = (label) => {
    setSelectedType((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };
  const handleVolumeChange = (label) => {
    setSelectedVolume((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };
  const handleVolumeCountry = (label) => {
    setSelectedCountry((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };
  const handleVolumeStrength = (label) => {
    setSelectedStrength((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };
  const addCartProduct = (item) => {
    addToCart(item, 1);
    message.success("Товар додано до кошика");
  };

  const sortOptions = [
    { value: "default", label: "За замовчуванням" },
    { value: "price_asc", label: "Від дешевших до дорожчих" },
    { value: "price_desc", label: "Від дорожчих до дешевших" },
    { value: "popular", label: "За популярністю" },
  ];

  return (
    <>
      <div className="catalogHero">
        <h1>{type ? getTypeAlcoholLabel(type) : brand || "Каталог"}</h1>
        <Breadcrumb
          style={{ margin: "8px 0 0" }}
          items={[
            { title: <Link to="/">Головна</Link> },
            { title: <Link to="/catalog">Каталог</Link> },
            { title: type ? getTypeAlcoholLabel(type) : brand || "Усі товари" },
          ]}
        />
      </div>

      <div className="catalogPageWrapper">
        <aside className="catalogSidebar" aria-label="Фільтри каталогу">
          <div className="catalogSidebarInner">
            <p className="catalogSidebarTitle">Фільтри</p>
            <div className="filterBlock">
              <Collapse
                bordered={false}
                defaultActiveKey={["1"]}
                style={{ background: "transparent" }}
              >
                <Panel header="Тип алкоголю" key="1">
                  <div className="scrollElement">
                    {alcohols.map((item) => (
                      <Checkbox
                        key={item.value}
                        checked={!!selectedType[item.value]}
                        onChange={() => handleTypeChange(item.value)}
                      >
                        {item.label}
                      </Checkbox>
                    ))}
                  </div>
                </Panel>
                <Panel header="Об'єм, л" key="2">
                  <div className="scrollElement">
                    {options.map((item) => (
                      <Checkbox
                        key={item.value}
                        checked={!!selectedVolume[item.value]}
                        onChange={() => handleVolumeChange(item.value)}
                      >
                        {item.label}
                      </Checkbox>
                    ))}
                  </div>
                </Panel>
                <Panel header="Країни" key="3">
                  <div className="scrollElement">
                    {country.map((item) => (
                      <Checkbox
                        key={item.value}
                        checked={!!selectedCountry[item.value]}
                        onChange={() => handleVolumeCountry(item.value)}
                      >
                        {item.label}
                      </Checkbox>
                    ))}
                  </div>
                </Panel>
                <Panel header="Міцність" key="4">
                  <div className="scrollElement">
                    {strength.map((item) => (
                      <Checkbox
                        key={item.value}
                        checked={!!selectedStrength[item.value]}
                        onChange={() => handleVolumeStrength(item.value)}
                      >
                        {item.label}
                      </Checkbox>
                    ))}
                  </div>
                </Panel>
              </Collapse>
            </div>
          </div>
        </aside>

        <main className="catalogMain">
          <div className="catalogToolbar">
            <span className="catalogToolbarLabel">Сортування:</span>
            <Select
              value={sortBy}
              onChange={setSortBy}
              options={sortOptions}
              style={{ minWidth: 260 }}
              popupMatchSelectWidth={false}
            />
          </div>

          {sortedData.length > 0 ? (
            <div className="productTable">
              {sortedData.map((item) => (
                <div className="productCard" key={item.id}>
                  <Link
                    to="product"
                    style={{ textDecoration: "none" }}
                    state={{ item }}
                  >
                    <img
                      src={getProductImageUrl(item)}
                      alt={item.type_alcohol}
                      className="productImage"
                    />
                    <div className="productInfo">
                      <p className="productLabel">
                        {formatProductTitle(item)}
                      </p>
                      <p className="productCost">{item.cost} грн</p>
                      <p className="productCountry">
                        Країна розробника:{" "}
                        <span className="dots">{item.countries}</span>
                      </p>
                      <p className="productVolume">
                        Об'єм:{" "}
                        <span className="dots">
                          {formatVolume(item.volume)} л
                        </span>
                      </p>
                      <p className="productDurability">
                        Міцність:{" "}
                        <span className="dots">
                          {formatDurability(item.durability)}
                        </span>
                      </p>
                    </div>
                  </Link>
                  <div style={{ display: "flex", gap: "5px" }}>
                    <Button
                      color="danger"
                      variant="solid"
                      onClick={(event) => {
                        event.stopPropagation();
                        addCartProduct(item);
                      }}
                      style={{ width: "100%" }}
                    >
                      Додати в корзину
                    </Button>
                    {user?.role === "Admin" && (
                      <Button
                        onClick={(event) => {
                          event.stopPropagation();
                          deleteProduct(item.id);
                        }}
                      >
                        Видалити продукт
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <Empty
              className="catalogEmpty"
              description="Немає подібних товарів"
            />
          )}
        </main>
      </div>
    </>
  );
}

export default Catalog;
