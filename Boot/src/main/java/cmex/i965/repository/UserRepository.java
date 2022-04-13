package cmex.i965.repository;

import cmex.i965.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.security.core.userdetails.UserDetails;

public interface UserRepository extends JpaRepository<User, Integer> {

    @Query("select u from User u where u.name = :name")
    UserDetails getByName(@Param("name") String name);

    @Query("select u from User u where u.name = :name")
    User findByName(@Param("name") String name);

}
